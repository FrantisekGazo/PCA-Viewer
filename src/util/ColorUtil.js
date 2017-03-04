"use strict";


/**
 * Provides methods for color manipulation.
 */
class ColorUtil {

    static componentToHex(c) {
        const hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    static rgbToHex(r, g, b) {
        return "#" + ColorUtil.componentToHex(r) + ColorUtil.componentToHex(g) + ColorUtil.componentToHex(b);
    }

    static hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    static hexToRgbString(hex) {
        const rgb = ColorUtil.hexToRgb(hex);
        return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    }
}

module.exports = ColorUtil;
