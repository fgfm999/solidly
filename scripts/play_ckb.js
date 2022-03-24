const {ethers} = require("hardhat");

/*
deploy WETH 0xA30764B9F073Ef38ce431b1AD2d00134e73Df90c
deploy BaseV1Factory 0xDf56b2cdbFE438b8cabae1Ab74E64824C19bB242
deploy BaseV1Router01 0xfB2FA609033E782fCEC57c6BC9F57e6e75D00ca6
deploy BaseV1 0xF5ed325b82ad725ce91F85863b06c4cde84135F0
deploy Multicall 0x95C902D82cDb9462d31EF68Ca1A21DED0d415529
deploy contracts/ve.sol:ve 0x2901f56ceCd97f4b47aF9Bb5d49786bcD106f1db
deploy contracts/ve_dist.sol:ve_dist 0x63DCB30f942DC052599a0959c04bd408d7e3389b
deploy BaseV1GaugeFactory 0x29EBb259AdAa3b3Fc3003821E5D78Ad81e9FB5E1
deploy BaseV1BribeFactory 0x4Ce299360aa9923AA210C4ea6857f94D8845b286
deploy BaseV1Voter 0xB99a17a707c3371F30F679332CA5718b0457451E
deploy solidly_library 0x3b4f0d0ee01C84F972B33EECbd733C2f64fBbd4E
deploy BaseV1Minter 0x325A891F89b6cdbc8f31f3E81eb144640A1E9244

* */


const ERC20_ABI = [
    "function balanceOf(address account) external view  returns (uint256)",
    "function decimals() external view  returns (uint8)",
    "function symbol() external view  returns (string)",
    "function name() external view  returns (string)"
]


async function main() {
    // const addr = '0xb83fb2e013d17e2aba15bc815f14d12195b4ce60'
    // const token = await ethers.getContractAt(ERC20_ABI, addr)
    // // console.log(token.address)
    // console.log(await token.symbol())
    // console.log(await token.decimals())
    // const router = await ethers.getContractAt("BaseV1Router01", "0xfB2FA609033E782fCEC57c6BC9F57e6e75D00ca6")
    // const factory = await ethers.getContractAt("BaseV1Factory", await router.factory())
    // console.log(await factory.allPairsLength())

    const voter = await ethers.getContractAt("BaseV1Voter", "0xB99a17a707c3371F30F679332CA5718b0457451E")
    const gaugeAddress = await voter.gauges("0x0D8Eda05dB7AC51fB41cED45A8F7111039e8B982")
    const gauge = await ethers.getContractAt("Gauge", gaugeAddress)
    console.log(await gauge.totalSupply())
    console.log(await gauge.bribe())


    // const accounts =await ethers.getSigners()
    // const to = accounts[0].address
    //
    // const weth = await ethers.getContractAt("WETH", "0xA30764B9F073Ef38ce431b1AD2d00134e73Df90c")
    // const gov = await ethers.getContractAt("BaseV1", "0xF5ed325b82ad725ce91F85863b06c4cde84135F0")
    //
    // console.log("b1", await weth.balanceOf(to))
    // console.log("b2", await gov.balanceOf(to))
    //
    // // const accounts =await ethers.getSigners()
    // // const to = accounts[0].address
    // const amountA = ethers.utils.parseUnits("100", 8)
    // const amountB = ethers.utils.parseUnits("1000", 18)
    // const txOverride = {
    //     gasPrice: 100,
    //     gasLimit: 1_000_000_000_000_002,
    // };
    //
    // await weth.approve(router.address, ethers.constants.MaxUint256)
    // await gov.approve(router.address, ethers.constants.MaxUint256)
    // console.log("approved...")
    // const tx =  await router.addLiquidity("0xA30764B9F073Ef38ce431b1AD2d00134e73Df90c", "0xF5ed325b82ad725ce91F85863b06c4cde84135F0",
    //     false, amountA, amountB, amountA, amountB, to, Math.ceil(Date.now() / 1000) + 1000, txOverride)
    // console.log(tx)
    // const rx = await tx.wait()
    // console.log(rx)


}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
