nome_do_livro = input("Digite o nome do livro: ")
paginas_totais = int(input("Digite a quantidade total de páginas: "))
paginas_lidas = int(input("Digite a quantidade de páginas lidas: "))

porcentagem_lida = (paginas_lidas / paginas_totais) * 100

print(f"Você leu {porcentagem_lida:.2f}% do livro '{nome_do_livro}'.")