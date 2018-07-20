# WAD Parser

## How to install it

You can install it using npm globally:

```sh
$ npm install @rojo2/wad-parser -g
$ wad-parser <wadfile> list [regular-expression]
```

or locally and using npx to execute it:

```sh
$ npm install @rojo2/wad-parser
$ npx wad-parser <wadfile>
```

## How to use it

List WAD entries

```sh
$ wad-parser <wadfile> list [regular-expression]
```

Extract WAD entries (right now it is capable of extract only textures and
sprites as TGA files, sounds as WAV and maps as JSONs)

```sh
$ wad-parser <wadfile> extract [regular-expression]
```

## Examples

Extracts all the DOOM2 sounds into .wav files
```sh
$ wad-parser DOOM2.WAD extract '^DS'
```

Extracts all the DOOM2 CyberDemon sprites into .tga files
```sh
$ wad-parser DOOM2.wad extract '^CYB'
```

Made with :heart: by [ROJO 2](http://rojo2.com)
