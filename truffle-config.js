module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*"
        },
        rinkeby: {
            provider: function () {
                return new HDWalletProvider(
                    'lunch exile knock opera solar copper loop monkey hamster celery tail hundred',
                    'https://rinkeby.infura.io/v3/cfc6383136db4e708c601373a22b7e7b');
            },
            network_id: 4,
            gas: 4500000,
            gasPrice: 10000000000,
        }
    },
    contracts_directory: './src/contracts/',
    contracts_build_directory: './src/abis/',
    compilers: {
        solc: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    }
}