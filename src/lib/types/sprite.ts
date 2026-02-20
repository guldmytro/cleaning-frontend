export const sizes = {
    'arrow': [37, 37],
    'arrow-corner': [48, 48],
    'arrow-down': [16, 10],
    'star': [18, 17],
    'star-gradient': [18, 17],
    'checked': [16, 13],
    'marker': [8, 12],
    'phone': [11, 11],
    'letter': [16, 13],
    'remove': [22, 22],
    'logo': [115, 29],
    'arrow-corner-2': [8, 11],
    'avart': [164, 50],
} as const;

export type SpriteId = keyof typeof sizes;