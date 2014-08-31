/**
 * A doc-block
 * 
 * with content
 * more content
 */
Math = (function() {
    function Math() {}

    /**
     * Add param two to param one
     *
     * @param {Integer} v1 Value one.
     * @param {Integer} v2 Value two.
     *
     * @return {Integer}.
     */
    Math.prototype.add = function (v1, v2)
    {
        return (v1 + v2);
    };

    /**
     * Subtract param two from param one
     *
     * @param {Integer} v1 Value one.
     * @param {Integer} v2 Value two.
     *
     * @return {Integer}.
     */
    Math.prototype.sub = function (v1, v2)
    {
        return (v1 - v2);
    };

    /**
     * Not tested method that should be visible with low coverage.
     */
    Math.prototype.div = function (v1, v2)
    {
        v3 = v1 / (v2 + v1);
        if (v3 > 14)
        {
            v4 = 0;
            for (i = 0; i < v3; i++)
            {
                v4 += (v2 * i);
            }
        }
        v5 = (v4 < v3 ? (v3 - v4) : (v4 - v3));

        v6 = (v1 * v2 * v3 * v4 * v5);

        d = [v1, v2, v3, v4, v5, v6];

        v7 = 1;
        for (i = 0; i < v6; i++)
        {
            shuffle( d );
            v7 = v7 + i * end(d);
        }

        v8 = v7;
        for (d = _i = 0, _len = x.length; _i < _len; d = ++_i) {
            v8 *= x[d];
        }

        v3 = v1 / (v2 + v1);
        if (v3 > 14)
        {
            v4 = 0;
            for (i = 0; i < v3; i++)
            {
                v4 += (v2 * i);
            }
        }
        v5 = (v4 < v3 ? (v3 - v4) : (v4 - v3));

        v6 = (v1 * v2 * v3 * v4 * v5);

        d = [v1, v2, v3, v4, v5, v6];

        v7 = 1;
        for (i = 0; i < v6; i++)
        {
            shuffle( d );
            v7 = v7 + i * end(d);
        }

        v8 = v7;
        for (d = _i = 0, _len = x.length; _i < _len; d = ++_i) {
            v8 *= x[d];
        }

        return v8;
    };

    /**
     * Simple copy for cpd detection.
     */
    Math.prototype.complex = function (v1, v2)
    {
        v3 = v1 / (v2 + v1);
        if (v3 > 14)
        {
            v4 = 0;
            for (i = 0; i < v3; i++)
            {
                v4 += (v2 * i);
            }
        }
        v5 = (v4 < v3 ? (v3 - v4) : (v4 - v3));

        v6 = (v1 * v2 * v3 * v4 * v5);

        d = [v1, v2, v3, v4, v5, v6];

        v7 = 1;
        for (i = 0; i < v6; i++)
        {
            shuffle( d );
            v7 = v7 + i * end(d);
        }

        v8 = v7;
        for (d = _i = 0, _len = x.length; _i < _len; d = ++_i) {
            v8 *= x[d];
        }

        v3 = v1 / (v2 + v1);
        if (v3 > 14)
        {
            v4 = 0;
            for (i = 0; i < v3; i++)
            {
                v4 += (v2 * i);
            }
        }
        v5 = (v4 < v3 ? (v3 - v4) : (v4 - v3));

        v6 = (v1 * v2 * v3 * v4 * v5);

        d = [v1, v2, v3, v4, v5, v6];

        v7 = 1;
        for (i = 0; i < v6; i++)
        {
            shuffle( d );
            v7 = v7 + i * end(d);
        }

        v8 = v7;
        for (d = _i = 0, _len = x.length; _i < _len; d = ++_i) {
            v8 *= x[d];
        }

        return v8;
    };
});
