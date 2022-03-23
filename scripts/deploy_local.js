async function deploy(name, ...args) {
    const C = await ethers.getContractFactory(name);
    const c = await C.deploy(...args)
    await c.deployed()
    console.log(`deploy ${name}`, c.address)
    return c
}

async function deployRouter() {
    const weth = await deploy("WETH")
    const factory = await deploy("BaseV1Factory")
    const router = await deploy("BaseV1Router01", factory.address, weth.address);
    return [weth, factory, router]
}

async function prepareAssets(weth, token) {
    await weth.deposit({value: ethers.utils.parseEther("123")})
    await token.mint("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", ethers.utils.parseEther("10000000"))
}


async function main() {
    const [weth, factory, router] = await deployRouter()

    const govToken =  await deploy("BaseV1")
    await deploy("Multicall")

    const ve = await deploy("contracts/ve.sol:ve", govToken.address)
    const ve_dist = await deploy("contracts/ve_dist.sol:ve_dist", ve.address)


    const gauge = await deploy("BaseV1GaugeFactory")
    const bribe = await deploy("BaseV1BribeFactory")
    const voter = await deploy("BaseV1Voter", ve.address, factory.address, gauge.address, bribe.address)

    await deploy("solidly_library", router.address)

    const minter = await deploy("BaseV1Minter", voter.address, ve.address, ve_dist.address)

    await prepareAssets(weth, govToken )

    // TODO: more tokens to be whitelist
    await voter.initialize([weth.address, govToken.address], minter.address)

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
