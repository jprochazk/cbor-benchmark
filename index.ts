import CBOR from 'cbor'

(async function () {
    const json = await (await fetch("data.json")).json();

    const samples = 1000;
    {
        const data = json;
        let sampled = [];
        let count = samples;
        while (count > 0) {
            const start = performance.now();
            const encoded = CBOR.encode(data)!;
            const end = performance.now();
            sampled.push(end - start);
            --count;
        }
        let average = sampled.reduce((acc, it) => acc += it) / sampled.length;
        console.log(`CBOR.encode ${samples} sample average: ${average} ms`);
    }

    {
        const data = json;
        let sampled = [];
        let count = samples;
        while (count > 0) {
            const start = performance.now();
            const buffer = new ArrayBuffer(8096);
            const encoded = CBOR.encodeInto(data, buffer)!;
            const end = performance.now();
            sampled.push(end - start);
            --count;
        }
        let average = sampled.reduce((acc, it) => acc += it) / sampled.length;
        console.log(`CBOR.encodeInto ${samples} sample average: ${average} ms`);
    }

    {
        const data = CBOR.encode(json)!;
        let sampled = [];
        let count = samples;
        while (count > 0) {
            const start = performance.now();
            const decoded = CBOR.decode(data);
            const end = performance.now();
            sampled.push(end - start);
            --count;
        }
        const average = sampled.reduce((acc, it) => acc += it) / sampled.length;
        console.log(`CBOR.decode ${samples} sample average: ${average} ms`);
    }
})();