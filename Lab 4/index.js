const connection = require('./config/mongoConnection')
const bands = require('./data/bands')

async function main() {
    const db=await connection.connectToDb()
    await db.dropDatabase()
    let pinkFloyd
    let beatles
    try{
        pinkFloyd = await bands.create( "Pink Floyd", [], "http://www.pinkfloyd.com", "EMI", ["Roger Waters", "David Gilmour", "Nick Mason", "Richard Wright", "Sid Barrett" ], 1965 );
        console.log("First band:",pinkFloyd);
    } catch (e) {
        console.log(e);        
    }

    try{
        beatles = await bands.create( "Pink Floyd", ["Progressive Rock", "Psychedelic rock", "Classic Rock"], "http://www.pinkfloyd.com", "EMI", [], 1965 );
        console.log("Second band:",beatles);
    }catch (e) {
        console.log(e);        
    }

    try{
        const allBands = await bands.getAll();
        console.log("All the bands:",allBands);
    }catch (e) {
        console.log(e);        
    }

    try{
        oneD = await bands.create("OneD", ["Rock", "Pop"], "http://www.onedirec.com", "Parlophone", ["Liam Payne", "Zayn Malik", "Louis Tomlinson", "Harry Styles"], 1960);
        console.log("Third band:",oneD);
    }catch (e) {
        console.log(e);        
    }

    try{
        const renamedPinkFloyd = await bands.rename(pinkFloyd._id, "Red Floyd"); 
        console.log("First band after rename:",renamedPinkFloyd); 
    }catch (e) {
        console.log(e);        
    }

    try{
        const removeBeatles = await bands.remove(beatles._id); 
        console.log(removeBeatles); 
    }catch (e) {
        console.log("No such band exist");        
    }

    try{
        const allBands = await bands.getAll();
        console.log("All the bands:",allBands);
    }catch (e) {
        console.log(e);        
    }

    try{
        newBand = await bands.create("", ["Rock"], "http://www.pinkfloyd.com", "EMI", ["Roger Waters", "David Gilmour", "Nick Mason", "Richard Wright", "Sid Barrett" ], 1965);
        console.log(newBand);
    } catch (e) {
        console.log(e);        
    }

    try{
        const removeBand = await bands.remove(beatl._id); 
        console.log(removeBand); 
    }catch (e) {
        console.log("No such band exist");        
    }

    try{
        const renamedBand = await bands.rename(pinkFloyd.id, "Red Floyed"); 
        console.log(renamedBand); 
    }catch (e) {
        console.log(e);        
    }

    try{
        const renameBand = await bands.rename(pinkFloyd._id, ""); 
        console.log(renameBand); 
    }catch (e) {
        console.log(e);        
    }

    try{
        const PinkFloyedBand = await bands.get(pinkFloyd.id); 
        console.log(PinkFloyedBand);
    }catch (e) {
        console.log("No such band exist");        
    }
    

   await connection.closeConnection();
};

main();