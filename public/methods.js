class methods {
    complemento(matriz) {
        return matriz.map(row => row.map(value => value === 255 ? 0 : 255));
    }

    intersecao(matrizA, matrizB) {
        if (matrizA.length !== matrizB.length || matrizA[0].length !== matrizB[0].length) {
            throw new Error("As matrizes devem ter o mesmo tamanho para calcular a interseção.");
        }

        return matrizA.map((row, i) =>
            row.map((value, j) => (value === 0 && matrizB[i][j] === 0) ? 0 : 255)
        );
    }
    dilate(matrix, elementoEstruturante) {
        let height = matrix.length;
        let width = matrix[0].length;
        let eHeight = elementoEstruturante.length;
        let eWidth = elementoEstruturante[0].length;
        let padY = Math.floor(eHeight / 2);
        let padX = Math.floor(eWidth / 2);
        let dilatado = [];
    
        // vai gerar a matriz de brancos
        for(let i = 0; i < height; i++) {
            dilatado[i] = [];
            for(let j = 0; j < width; j++) {
                dilatado[i][j] = 255;
            }
        }
    
        // Aplicar a dilatação
        for(let i = 0; i < height; i++) {
            for(let j = 0; j < width; j++) {
                if(matrix[i][j] === 0) { // Verifica se o pixel é preto
                    // Aplicar o elemento estruturante
                    for(let y = 0; y < eHeight; y++) {
                        for(let x = 0; x < eWidth; x++) {
                            let ny = i + y - padY;
                            let nx = j + x - padX;
                            if(elementoEstruturante[y][x] === 1 && ny >= 0 && ny < height && nx >= 0 && nx < width) {
                                dilatado[ny][nx] = 0; // Expande o pixel preto
                            }
                        }
                    }
                }
            }
        }
    
        return dilatado;
    }
    
    preencherBuracos(matrix, x, y) {
        let complementomatrix = this.complemento(matrix);
        let height = matrix.length;
        let width = matrix[0].length;
        let wMatrix = [];
        for(let i = 0; i < height; i++) {
            wMatrix[i] = [];
            for(let j = 0; j < width; j++) {
                wMatrix[i].push(255);
                if(i === x && j === y) wMatrix[i][j] = 0;
            }
        }
        let m2 = wMatrix;
        const elementoEstruturante = [
            [0, 1, 0],
            [1, 1, 1],
            [0, 1, 0]
        ];
        let dilatado;
        let intersecao;
        let i2;
        let o = 0;
        do {
            dilatado = this.dilate(m2, elementoEstruturante);
            intersecao = this.intersecao(dilatado, complementomatrix);
            i2 = intersecao;
            m2 = intersecao;
            o++
            if(o%100==0) console.log(o/10 + '%');
        } while (o<1000);
        for(let i=0; i<height; i++){
            for(let j=0; j<width; j++){
                if(m2[i][j] == 0) matrix[i][j] = 0;
            }
        }
        console.log('terminado!');
        return matrix;
    }
}
