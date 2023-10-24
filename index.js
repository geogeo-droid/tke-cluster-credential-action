const core = require('@actions/core');
const github = require('@actions/github');
const tencentcloud = require("tencentcloud-sdk-nodejs");
const YAML = require('yaml');
const fs = require('fs');
const path = require('path');
const os = require('os');

const retrieveClusterCredential = async (tke) => {
    const TkeClient = tencentcloud.tke.v20180525.Client;
    const models = tencentcloud.tke.v20180525.Models;

    const Credential = tencentcloud.common.Credential;
    const cred = new Credential(tke.secretId, tke.secretKey);
    const client = new TkeClient(cred, tke.region);

    const req = new models.DescribeClusterKubeconfigRequest();
    req.ClusterId = tke.clusterId;
    req.IsExtranet = tke.isExtranet;

    return new Promise((resolve, reject) => {
        client.DescribeClusterKubeconfig(req, (err, data) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(data);
            }
        });
    })
}


const process = async (tke) => {
    const credential = await retrieveClusterCredential(tke);
    await fs.promises.mkdir(path.join(os.homedir(), '.kube'), {recursive: true, mode: 0o700});
    await fs.promises.writeFile(path.join(os.homedir(), '.kube/config'), credential.Kubeconfig, {mode: 0o600});

    console.log(`finish saving TKE config to '$HOME/.kube/config'.`);
}

try {
    const tke = {
        secretId: core.getInput('secret_id'),
        secretKey: core.getInput('secret_key'),
        region: core.getInput('tke_region'),
        clusterId: core.getInput('cluster_id'),
        isExtranet: core.getInput('is_extranet'),
    };

    process(tke).catch((reason) => {
        core.setFailed(`fail to get cluster credentials: ${reason}`);
    });
} catch (error) {
    core.setFailed(error.message);
}
