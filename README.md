# ntx-action
Testing on NTX - GitHub Action

## Inputs

### `domain`

**Required** The domain of the machine where NTX is installed. Default: `"localhost"`

### `uri`
**Required** The URI of for the request.

### `username`
**Required** The MTX username.

### `password`
**Required** The NTX password.

### `wait-time`
**Required** The domain of the machine where NTX is installed. Default: `"20"`

## Outputs

### `status`

The message with result of the test

## Example usage

`
uses: actions/ntx-action@v2
with:
  domain: 'http://localhost:8080'
  uri: '/NTX/ntxWebService?LinkID=178&TypeID=1...'
  username: foo
  passwrod: xpto
  wait-time: 10
  
`
