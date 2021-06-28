// generator random-js

function createRandomCode() {
    const config = {
        chars: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        separator: '-',
        mask: '*',
        parts: 3,
        part_size: 4,
        getChar: function (pool) {
            var random = Math.floor(Math.random() * pool.length);
            return pool.charAt(random);
        }
    };
    
    return config;
}

module.exports = { createRandomCode };