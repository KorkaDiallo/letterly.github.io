key = {
    "ǘ": "ü",
    "ə̨́": "ə̨",
    "ų́": "ų",
    "ą́": "ą",
    "ę́": "ę",
    "į́": "į",
    "ǫ́": "ǫ",
    "á": "a",
    "é": "e",
    "í": "i",
    "ó": "o",
    "ú": "u",
    "ąą": "ą",
    "ęę": "ę",
    "įį": "į",
    "ǫǫ": "ǫ",
    "aa": "a",
    "ee": "e",
    "ii": "i",
    "oo": "o",
    "uu": "u",
    'ąi': '𐓚',
    'aį': '𐓚',
    'ąį': '𐓚',
    'eį': '𐓚',
    'ęį': '𐓚',
    'ai': '𐓙',
    "ae": "𐓙",
    'oį': '𐓫',
    'ǫį': '𐓫',
    'uį': '𐓫',
    "ųę": "𐓫",
    'hc': '𐓲',
    'ch': '𐓲',
    'hč': '𐓝',
    'hk': '𐓤',
    'ht': '𐓰',
    'br': '𐓜',
    'hp': '𐓬',
    't': '𐓰',
    'd': '𐓰',
    'c': '𐓲',
    'č': '𐓝',
    'p': '𐓬',
    'k': '𐓤',
    'ž': '𐓻',
    'š': '𐓯',
    'a': '𐓘',
    'e': '𐓟',
    'i': '𐓣',
    'o': '𐓪',
    'ü': '𐓶',
    'u': '𐓶',
    'ą': '𐓘͘',
    'į': '𐓣͘',
    'ę': '𐓣͘',
    'ǫ': '𐓪͘',
    'ų': '𐓪͘',
    'ə̨': '𐓣͘',
    'ð': '𐓵',
    'h': '𐓡',
    'l': '𐓧',
    'm': '𐓨',
    'n': '𐓩',
    's': '𐓮',
    'w': '𐓷',
    'x': '𐓸',
    'ɣ': '𐓸',
    'z': '𐓺',
    'ʔ': "'",
    "𐓘͘𐓘": "𐓘͘",
    "𐓘𐓘": "𐓘",
    "𐓟𐓟": "𐓟",
    "𐓣͘𐓣͘": "𐓣͘",
    "𐓣͘𐓣": "𐓣͘",
    "𐓣𐓣": "𐓣",
    "𐓪͘𐓪͘": "𐓪͘",
    "𐓪͘𐓪": "𐓪͘",
    "𐓪𐓪": "𐓪",
    "𐓶𐓶": "𐓶",
}
newkey = {}

function capitalize(n){
    if(n.charCodeAt(0) > 50000){
        n = n.substring(0,2).toUpperCase() + n.substring(2)
    }
    else{
        n = n.substring(0,1).toUpperCase() + n.substring(1)
    }
    return n
}
for(k of Object.keys(key)){
    newkey[k] = key[k]
    v = key[k]
    k = capitalize(k)
    v = capitalize(v)
    newkey[k] = v
}

function latinToOsage(phrase){
    for(x of Object.entries(newkey)){
        var regex = new RegExp(x[0], "g")
        phrase = phrase.replace(regex, x[1])
    }
    return phrase
}

console.log(latinToOsage("Hką́ącezi"))

