/**
 * Copyright (C) 2016 antiaris.xyz
 * test.js
 *
 * changelog
 * 2016-06-28[11:01:03]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */
'use strict';

const assert = require('assert');
const {
    Node,
    walk
} = require('../');

describe('weak-connected-graph', () => {
    describe('#walk', () => {
        it('1 circle including 3 nodes', () => {
            /*
                b->a->c->b
             */
            const a = new Node('a');
            const b = new Node('b', a);
            const c = new Node('c', b);
            a.append(c);
            const map = walk(a, b, c);
            console.log(map);
        });
        it('2 circles including 5 nodes', () => {
            /*
                c->b->a->c
                d->e->a->d
             */
            const a = new Node('a');
            const b = new Node('b', a);
            const c = new Node('c', b);
            const e = new Node('e', a);
            const d = new Node('d', e);
            a.append(c);
            a.append(d);
            let map = walk(c, b, a, d, e);
            console.log(map);
        });
        it('one node no circle', () => {
            /*
                a
             */
            const a = new Node('a');
            let map = walk(a);
            console.log(map);
        });
        it('one node one circle', () => {
            /*
                a->a
             */
            const a = new Node('a');
            a.append(a);
            let map = walk(a);
            console.log(map);
        });

        it('two graph', () => {
            /*
                b->a->c->b
                e->d->e
             */
            const a = new Node('a');
            const b = new Node('b', a);
            const c = new Node('c', b);
            const d = new Node('d');
            const e = new Node('e', d);
            a.append(c);
            d.append(e);
            let map = walk(a, b, c, d, e);
            console.log(map);
        });
    });
});