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
        this.content = '';
        this.dependencies = [];
        this.append(...dependencies);
    }
    append(...dependencies) {
        this.dependencies.push(...dependencies);
        this.content = this.dependencies.map(dependency => `{${dependency.name}}`).join();
    }
    replace(name, replaced) {
        this.content = this.content.replace(`{${name}}`, `{${replaced}}`);
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

    if (!map.has(node.name)) {
        node.dependencies.forEach(dependency => {
            node.replace(dependency.name, nameMap.get(dependency.name));
        });
        map.set(node.name, node.content);
    }

    if (!nameMap.has(node.name)) {
        nameMap.set(node.name, node.name + '_c_' + md5(node.content));
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
        ret.set(key, {
            name: nameMap.get(key),
            content: value
        });
    });

    return ret;
};


exports.Node = Node;
exports.walk = walk;