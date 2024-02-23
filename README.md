# TONStarter-templates

This repository is a collection of various templates that can be used with TONStarter. Anyone who create TONStarter projects can execute desired templates using their own token addresses and customize them to their liking.

All templates are built on a vanilla environment and React CRA, allowing for freedom in design customization as no special libraries or frameworks are used for CSS.

## Template Types

- [default](https://github.com/tokamak-network/TONStarter-templates/tree/main/packages/basic)
- [tokamak-design](https://github.com/tokamak-network/TONStarter-templates/tree/main/packages/tokamak-design)

## Env sample

A .env file for configuration should be created in the root directory of every template, and a sample is provided as follows.

```
# Your L2TOKEN address created through TONStarter
REACT_APP_L2TOKEN=0x17904851ee325d35bbe511fd437b21dbbaf33d06
# RPC address for L2 communication
REACT_APP_TITAN_PROVIDER=https://rpc.titan-goerli.tokamak.network
```
