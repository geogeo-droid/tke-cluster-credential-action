# tke-cluster-credential-action
Retrieve TKE cluster credential and set it to `$HOME/.kube/config`.

## Inputs

### `secret_id`

**Required** Tencent Cloud secret id. Should be referred to a encrypted environment variable.

### `secret_key`

**Required** Tencent Cloud secret key. Should be referred to a encrypted environment variable.

### `tke_region`

**Required** TKE bucket region.

### `cluster_id`

**Required** TKE cluster id.

### `is_extranet`

**Required** TKE extranet flag.
boolean

## Example usage

```
uses: TencentCloud/tke-cluster-credential-action@v1
with:
  secret_id: ${{ secrets.TENCENT_CLOUD_SECRET_ID }}
  secret_key: ${{ secrets.TENCENT_CLOUD_SECRET_KEY }}
  tke_region: ${{ secrets.TKE_REGION }}
  cluster_id: ${{ secrets.TKE_CLUSTER_ID }}
  is_extranet: ${{ secrets.IsExtranet }}
```
