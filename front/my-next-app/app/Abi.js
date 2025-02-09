 export const contractABI =[
    {
      "stateMutability": "view",
      "type": "function",
      "name": "getVaultNames",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "string[]"
        }
      ]
    },
    {
      "stateMutability": "nonpayable",
      "type": "function",
      "name": "RemoveUserVault",
      "inputs": [
        {
          "name": "v_name",
          "type": "string"
        },
        {
          "name": "user",
          "type": "address"
        },
        {
          "name": "invest",
          "type": "uint128"
        }
      ],
      "outputs": []
    },
    {
      "stateMutability": "nonpayable",
      "type": "function",
      "name": "addUserVault",
      "inputs": [
        {
          "name": "v_name",
          "type": "string"
        },
        {
          "name": "user",
          "type": "address"
        },
        {
          "name": "invest",
          "type": "uint128"
        }
      ],
      "outputs": []
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "users_vault",
      "inputs": [
        {
          "name": "arg0",
          "type": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint128"
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "user_array",
      "inputs": [
        {
          "name": "arg0",
          "type": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "tuple",
          "components": [
            {
              "name": "user_address",
              "type": "address"
            }
          ]
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "vaults_array",
      "inputs": [
        {
          "name": "arg0",
          "type": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "tuple",
          "components": [
            {
              "name": "vault_name",
              "type": "string"
            },
            {
              "name": "vault_tokens",
              "type": "string[]"
            },
            {
              "name": "users_addresses",
              "type": "address[2]"
            }
          ]
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "Gaming_investments",
      "inputs": [
        {
          "name": "arg0",
          "type": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint128"
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "Defi_investments",
      "inputs": [
        {
          "name": "arg0",
          "type": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint128"
        }
      ]
    },
    {
      "stateMutability": "view",
      "type": "function",
      "name": "Meme_investments",
      "inputs": [
        {
          "name": "arg0",
          "type": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint128"
        }
      ]
    },
    {
      "stateMutability": "nonpayable",
      "type": "constructor",
      "inputs": [],
      "outputs": []
    }
  ]