# file-to-environment-variables
This is a simple composite action used to convert given files into environment variables in Github Actions runners. This can be used for enabling configuration with things like `envsubst` or `sed` commands. 

# Current Supported File Types
- .env
- .json
- .yaml/yml

# How To Use This 
`.env file`
```yaml
    uses: emanuelzapata/file-to-environment-variables@v1
    with:
        file-path: ./path/to/your/file.env
```

`.json file`
```yaml
    uses: emanuelzapata/file-to-environment-variables@v1
    with:
        file-path: ./path/to/your/file.json
```

`.yaml/yml file`
```yaml
    uses: emanuelzapata/file-to-environment-variables@v1
    with:
        file-path: ./path/to/your/file.yaml
```

# Dealing with arrays
The action will convert yaml and json arrays into environment variables by appending the index to the value. So for example:
```json
{
    "people": [
        "John Doe",
        "Jane Doe",
        "John Smith", 
        "Jane Smith"
    ]
}
```
Will end up becoming:
```env
PEOPLE_0=JOHN DOE
PEOPLE_1=JANE DOE
PEOPLE_2=JOHN SMITH
PEOPLE_3=JANE SMITH
```