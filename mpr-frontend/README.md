# Administrační systém QWERTY #

ES6 React aplikace
Autor: Vít Sikora

## Jak nainstalovat projekt ##

1. naklonujte si repozitář projektu
2. nainstalujte si node.js (vč. NPM, musí být v PATH)
3. nainstalujte si vývojové prostředí pro editaci JS/JSX (doporučuji Atom + NetBeans)
4. ve složce projektu spustťe příkaz ```npm install```, toto nainstaluje všechny závislosti nutné pro vývoj (bude to chvíli trvat)
5. v souborech /src/config.js a /deploy/proxy.php nastavte adresu API, s jakým má pracovat.

## Jak spustit aplikaci v demo rozhraní a vyvíjet ##

1. otevřít konzoli ve složce projektu (windows: shift+rightclick na volné místo a Open command window here)
2. příkazem ```atom .``` otevřete Atom otevřený rovnou s tímto projektem (musíte mít nainstalovaný editor Atom, nejlépe i s pluginy pro React a ES6), případně použijte libovolný jiný editor.
3. příkazem ```npm start``` projekt spustíte, až uvidíte text ```webpack: Compiled successfully```, tak server běží a okno někam schovejte (nezavírat).
4. v prohlížeči přistupte na adresu ```localhost:3002```, zde poběží projekt vč. live-reloadingu (tedy budou se živě projevovat změny ve zdrojácích)
5. nyní můžete provádět změny a vidět jejich reálný dopad v prohlížeči (pokud najedete do erroru, třeba JS výjímka, pak je nutné dát F5), v němž mějte vždy otevřenou konzoli (Ctrl+Shift+I)

## Jak vytvořit produkční sestavení ##

1. příkazem ```npm build``` (případně spuštěním souboru ```build.cmd```) se vytvoří produkční sestavení ve složce ```/deploy```
