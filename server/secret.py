import secrets

def generate_keys():
    secret_key = secrets.token_hex(32)
    jwt_secret_key = secrets.token_hex(32)
    
    print(f'SECRET_KEY={secret_key}')
    print(f'JWT_SECRET_KEY={jwt_secret_key}')

if __name__ == "__main__":
    generate_keys()