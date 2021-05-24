# ntx-action
Testing on NTX - GitHub Action

## Inputs

### `ntx-url`

**Required** The URL of the machine where NTX is installed. Default: `"localhost"`

## Outputs

### `status`

The status of the test

## Example usage

uses: actions/ntx-action@v1.0
with:
  ntx-url: 'localhost:8080'
