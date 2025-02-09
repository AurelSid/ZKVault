# Vyper version
# @version >0.3.10

struct VaultStruct:
    vault_name: String[32]  
    vault_tokens: DynArray[String[32], 3]
    users_addresses: address[2]

struct UserStruct:
    user_address: address 
 
users_vault: public (uint128[5])

user_array: public (DynArray[UserStruct, 3])

vaults_array: public(VaultStruct[3])

test: uint128

Gaming_investments : public(HashMap[address, uint128])
Defi_investments : public(HashMap[address, uint128])
Meme_investments : public(HashMap[address, uint128])

@deploy
def __init__():
    self.vaults_array[0] = VaultStruct(
        vault_name="Gaming Vault", 
        vault_tokens=["BONK", "JUP", "SUI"], 
        users_addresses=[0x0000000000000000000000000000000000000000, 0x0000000000000000000000000000000000000000]
    )
    self.vaults_array[1] = VaultStruct(
        vault_name="DeFi Vault", 
        vault_tokens=["RUNE", "AAVE", "UNI"], 
        users_addresses=[0x0000000000000000000000000000000000000000, 0x0000000000000000000000000000000000000000]
    )
    self.vaults_array[2] = VaultStruct(
        vault_name="Meme Vault", 
        vault_tokens=["SHIB", "PEPE", "DOGE"], 
        users_addresses=[0x0000000000000000000000000000000000000000, 0x0000000000000000000000000000000000000000]
    )
    self.test = 3

@external
@view
def getVaultNames() -> DynArray[String[32], 3]:
    return [
        self.vaults_array[0].vault_name, 
        self.vaults_array[1].vault_name, 
        self.vaults_array[2].vault_name
    ] 

@external
def RemoveUserVault(v_name: String[32], user: address, invest: uint128):
    for i: uint128 in range(3):
        if self.vaults_array[i].vault_name == v_name:
            for j: uint128 in range(2):
                if self.vaults_array[i].users_addresses[j] == user:
                    if v_name == "Gaming Vault":
                        self.Gaming_investments[user] -= invest
                    elif v_name == "DeFi Vault":
                        self.Defi_investments[user] -= invest
                    elif v_name == "Meme Vault":
                        self.Meme_investments[user] -= invest

                    if self.Gaming_investments[user] < 0:
                        self.Gaming_investments[user] = 0
                    if self.Defi_investments[user] < 0:
                        self.Defi_investments[user] = 0
                    if self.Meme_investments[user] < 0:
                        self.Meme_investments[user] = 0
                    
                    if self.Gaming_investments[user] == 0:
                        self.removeUserFromVault(i, user, v_name)
                    if self.Defi_investments[user] == 0:
                        self.removeUserFromVault(i, user, v_name)
                    if self.Meme_investments[user] == 0:
                        self.removeUserFromVault(i, user, v_name)
                    
                    return

@internal
def removeUserFromVault(vault_index: uint128, user: address, vault_name: String[32]):
    for j: uint128 in range(2):
        if self.vaults_array[vault_index].users_addresses[j] == user:
            self.vaults_array[vault_index].users_addresses[j] = 0x0000000000000000000000000000000000000000
            break

@external
def addUserVault(v_name: String[32], user: address, invest: uint128):
    user_found :bool = False
    for i: uint128 in range(3):
        if self.vaults_array[i].vault_name == v_name:
            for j: uint128 in range(2):
                if self.vaults_array[i].users_addresses[j] == user:
                    user_found = True
                    if v_name == "Gaming Vault":
                        self.Gaming_investments[user] += invest
                    elif v_name == "DeFi Vault":
                        self.Defi_investments[user] += invest
                    elif v_name == "Meme Vault":
                        self.Meme_investments[user] += invest
                    return

            for j: uint128 in range(2):
                if self.vaults_array[i].users_addresses[j] == 0x0000000000000000000000000000000000000000:
                    self.vaults_array[i].users_addresses[j] = user
                    if v_name == "Gaming Vault":
                        self.Gaming_investments[user] = invest
                    elif v_name == "DeFi Vault":
                        self.Defi_investments[user] = invest
                    elif v_name == "Meme Vault":
                        self.Meme_investments[user] = invest
                    return

            raise ("Vault is full")


