/**
 * Copyright (C) 2016 antiaris.xyz
 * index.js
 *
 * changelog
 * 2016-06-28[11:00:19]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */
'user strict';
const crypto = require('crypto');

const md5 = content => {
    const md5 = crypto.createHash('md5').update(content).digest('hex');
    return parseInt(md5, 16).toString(36).slice(0, 6);
};

class Node {
    constructor(name, ...dependencies) {
        this.name = name;
        this.content = name; // mock
        this.dependencies = [...dependencies];
    }
    append(dependency) {
        this.dependencies.push(dependency);
    }
}

const walkNode = (node, map, nameMap, path) => {
    if (path.some(n => (n.name === node.name))) {
        if (!nameMap.has(node.name)) {
            nameMap.set(node.name, node.name + '_s_' + Date.now());
        }
        return;
    }

    if (map.has(node.name)) {
        return;
    } else {
        path.push(node);
        node.dependencies.forEach(dependency => {
            walkNode(dependency, map, nameMap, path);
        });
        path.pop();
    }

    if (!nameMap.has(node.name)) {
        nameMap.set(node.name, node.name + '_c_' + md5(node.content));
    }

    if (!map.has(node.name)) {
        map.set(node.name, /*mock content*/ node.dependencies.map(n => nameMap.get(n.name)));
    }
};

const walk = (...nodes) => {
    const map = new Map();
    const nameMap = new Map();
    nodes.forEach(node => {
        const path = [];
        walkNode(node, map, nameMap, path);
    });

    const ret = new Map();

    map.forEach((value, key) => {
        ret.set(nameMap.get(key), value);
    });

    return ret;
};


exports.Node = Node;
exports.walk = walk;