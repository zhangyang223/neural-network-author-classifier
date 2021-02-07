
let trainedNet;
let net = new brain.NeuralNetwork();
let maxSize = 0;
let meanSize = 0;

function encode(arg) 
{
    let r =  arg.split('').map(x => (x.charCodeAt(0) / 256));
/*    if (r.length < maxSize)
    {
        let i = r.length;
        for (; i< maxSize;i++) r.push(0);
    }
*/    
    if (r.length < meanSize)
    {
        // pad
        let i = r.length;
        for (; i< meanSize-1;i++) r.push(0);
    }
    else
    {
        // truncate
        r = r.slice(0, meanSize);
    }
    console.log(r.length);
    return r;
}

function processTrainingData(data) {
    return data.map(d => {
        return {
            input: encode(d.input),
            output: d.output
        }
    })
}

function train(data) 
{
    maxSize = Math.max.apply(null, data.map(d=>{return d.input.length;}));

    var sum = data.reduce(function(a, b){
        return a + b.input.length;
    }, 0);
    const len = data.length;
    console.log("sum=" + sum + ",len=" + len);
    meanSize = sum / len;

    console.log("average: " + meanSize);
    net.train(processTrainingData(data));
//    trainedNet = net.toFunction();
};

function execute(input) {
//    let results = trainedNet(encode(input));
    console.log(input)
    let results = net.run(encode(input));
    console.log(results)
    let output;
    let certainty;
    if (results.yes > results.no) {
        output = 'be funny'
        certainty = Math.floor(results.yes * 100)
    } else { 
        output = 'not be funny'
        certainty = Math.floor(results.no * 100)
    }

    return "I'm " + certainty + "% sure that joke will " + output;
}

train(trainingData);
//console.log(execute("Paste your tweet here333333333333333333333333333333333333335555iiixxx  "));
