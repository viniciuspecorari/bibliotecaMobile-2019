
// Pega os dados das text box
$(document).on('click', '#cadastrar', function(){
  var parametros = {
    "titulo": $("#txtTitulo").val(),
    "autor": $("#txtAutor").val(),
    "ano": $("#txtAno").val(),
    "isbn": $("#txtIsbn").val(),
  }

// Enviando os dados para o webservices
  $.ajax({
    type:"post",
    url:"https://biblioteca-mobile-2019-onoilvp.c9users.io/cadastroLivros.php",
    data:parametros,
    success:function(data){
      alert(data);
      $("#txtTitulo").val(""),
      $("#txtAutor").val(""),
      $("#txtAno").val(""),
      $("#txtIsbn").val("")
    },
    error:function
    (data){
      alert(data);
    }
  });
});

//Ação de preenchimento do select

function preencherSelect(){
  $.ajax({
    type:"post",
    url:"https://biblioteca-mobile-2019-onoilvp.c9users.io/consultaLivros.php",
    dataType:"json",
    success: function(data){
      var itemLista = "";
      $.each(data.livros, function(i, dados){
        itemLista += "<option value='"+dados.codigo+"'>"+dados.titulo+"</option>";
      });
      $("#buscaRe").html(itemLista);
    },
    error: function(data){
      alert("Erro: "+data);
    }
  });
}

//preenchendo os campos após selecionar o titulo

$(document).on("change", "#buscaRe", function(){
    var codigoSelecionado = $("option:selected", ("#buscaRe")).val();
    $.ajax({
      type:"get",
      url:"https://biblioteca-mobile-2019-onoilvp.c9users.io/selecionarLivro.php?",
      data:"codigo="+codigoSelecionado,
      dataType:"json",
      success: function(data){
          $.each(data.livros, function(i, dados){
              $("#txtConTitulo").val(dados.titulo),
              $("#txtConAutor").val(dados.autor),
              $("#txtConAno").val(dados.ano),
              $("#txtConIsbn").val(dados.isbn)
          });
      },
      erro: function(data){
        alert("Erro: "+data);
      }
    });
});
