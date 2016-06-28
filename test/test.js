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
            assert.ok(map.get('a').content.indexOf(map.get('c').name) > -1);
            assert.ok(map.get('b').content.indexOf(map.get('a').name) > -1);
            assert.ok(map.get('c').content.indexOf(map.get('b').name) > -1);
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
            assert.ok(map.get('a').content.indexOf(map.get('c').name) > -1);
            assert.ok(map.get('a').content.indexOf(map.get('d').name) > -1);
            assert.ok(map.get('b').content.indexOf(map.get('a').name) > -1);
            assert.ok(map.get('c').content.indexOf(map.get('b').name) > -1);
            assert.ok(map.get('e').content.indexOf(map.get('a').name) > -1);
            assert.ok(map.get('d').content.indexOf(map.get('e').name) > -1);
        });
        it('one node no circle', () => {
            /*
                a
             */
            const a = new Node('a');
            let map = walk(a);
            assert.deepEqual(map.get('a').content, '');
        });
        it('one node one circle', () => {
            /*
                a->a
             */
            const a = new Node('a');
            a.append(a);
            let map = walk(a);
            assert.ok(map.get('a').content.indexOf(map.get('a').name) > -1);
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
            assert.ok(map.get('a').content.indexOf(map.get('c').name) > -1);
            assert.ok(map.get('d').content.indexOf(map.get('e').name) > -1);
            assert.ok(map.get('b').content.indexOf(map.get('a').name) > -1);
            assert.ok(map.get('c').content.indexOf(map.get('b').name) > -1);
            assert.ok(map.get('e').content.indexOf(map.get('d').name) > -1);
        });

        it('two nested circles one graph', () => {
            /*
                a->b->c->d->a
                d->b
             */
            const a = new Node('a');
            const b = new Node('b');
            const c = new Node('c');
            const d = new Node('d');
            a.append(b);
            b.append(c);
            c.append(d);
            d.append(a);
            d.append(b);
            let map = walk(a, b, c, d);
            assert.ok(map.get('a').content.indexOf(map.get('b').name) > -1);
            assert.ok(map.get('b').content.indexOf(map.get('c').name) > -1);
            assert.ok(map.get('c').content.indexOf(map.get('d').name) > -1);
            assert.ok(map.get('d').content.indexOf(map.get('a').name) > -1);
            assert.ok(map.get('d').content.indexOf(map.get('b').name) > -1);
        });
    });
});