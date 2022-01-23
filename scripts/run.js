const main = async () => {
    // Deploy contract locally
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({value: hre.ethers.utils.parseEther("0.1")});
    await waveContract.deployed();
    
    // Get contract balance
    var contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
    console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance))

    
    console.log(`Contract deployed to: ${waveContract.address}`);
    console.log(`Contract deployed by: ${owner.address}`);

    // Get wavecount
    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    
    // Wave
    let waveTxn = await waveContract.wave("Hello William, great job! 1");
    await waveTxn.wait();

    // // Wave 2
    // waveTxn = await waveContract.wave("Hello William, great job! 2");
    // await waveTxn.wait();

    // Get contract balance
    var contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
    console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance))


    // Have a random person wave
    waveTxn = await waveContract.connect(randomPerson).wave("A random wave");
    await waveTxn.wait();

    // Get contract balance
    var contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
    console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance))

    waveCount = await waveContract.getTotalWaves();

    // Subtract one wave
    // let subtractWave = await waveContract.removeWave();
    // await subtractWave.wait();
    // waveCount = await waveContract.getTotalWaves();

    // Get wave information
    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
}

const runMain = async ()=> {
    try {
        await main();
        process.exit(0);
    }catch (error){
        console.log(error);
        process.exit(1)
    }
}

runMain();