$(document).ready(function () {
  products.forEach((p) => {
    const wrapper = $("#wrapper-Product");
    const wrapper2 = $("#wrapper-Product2");

    // Ko'p tanlanayotgan mahsulotlarni chiqaramiz
    wrapper.append(
      $(`<div class="card d-inline-block mr-3 mb-4">
      <div class="inner">
      <img class="card-img-top" src="${p.img}">  
      </div>
      <div class="card-body">
        <h5 class="card-title text-dark font-weight-bold">Narxi: ${p.price} so'm</h5>
        <p class="card-text text-dark font-weight-bold text-nowrap">Nomi : ${p.name}</p>
        <button type="button" class="btn btn-outline-success SavatgaOlish" >Savatchaga qo'shish <i class="fas fa-shopping-cart fa-lg"></i></button>
      </div>
    </div>`)
    );

    // Yangi mahsulotlarni chiqaramiz
    wrapper2.append(
      $(`<div class="card d-inline-block mr-3 mb-4">
      <div class="inner">
      <img class="card-img-top" src="${p.img}">  
      </div>
      <div class="card-body">
        <h5 class="card-title text-dark font-weight-bold">Narxi: ${p.price} so'm</h5>
        <p class="card-text text-dark font-weight-bold text-nowrap">Nomi : ${p.name}</p>
        <button type="button" class="btn btn-outline-success SavatgaOlish">Savatchaga qo'shish <i class="fas fa-shopping-cart fa-lg"></i></button>
      </div>
    </div>`)
    );
  });

  $("#form").submit(function (e) {
    e.preventDefault();
  });
  // Bu mahsulotlar bo'limi bosilganda Umumiy chiqadigan mahsulotlar to'plami
  $(".navbar-brand").click(function () {
    $(".Menu").toggle(2000);
  });

  // Bu biron narsa tanlasak uni savatchaga olib o'tish uchun qildik kichik modal desa ham bo'ladi
  $("#SavatdagiMahsulotlar").click(function () {
    $("#TanlanganMahsulotlar").toggle();
  });

  // Umumiy pul => bu biz tanlagan mahsulotlarni jami summani olishga yordam beradi barcha summani o'zida saqlaydi
  var UmumiyPul = 0;

  var MahsulotlarSoni = 0;
  var ItemsLi = "";
  // SavatchadagiMahsulotlar => buni qiymati dastlar "Savatchada mahsulot yo'q" ga teng keyin "UmumiyMahsulot" massivini shuning o'rniga qo'yamiz
  var SavatchadagiMahsulotlar = $("#SavatchadagiMahsulot");

  // SavatgaOlish => Bu "Savatchaga qo'shish " tugmasi orqali biren-ketin metodlarni bajarish uchun
  $(".SavatgaOlish").click(function () {
    // bu this.closest => buyrug'i kerakli cardni topib beradi
    var product = $(this).closest(".card");

    // productToAdd => bu obyekt bizga bizga kerakli card ichidagi ma'lumotlarni obyekt ko'rinishida yi'gishimiz uchun kerak bo'ladi
    var productToAdd = {};

    // find => buyrug'i ichiga berilgan qiymatini topadi
    productToAdd.name = product.find(".card-text").text().slice(6).trim();
    productToAdd.price = product.find(".card-title").text().slice(6).trim();
    productToAdd.img = product.find(".card-img-top").attr("src");
    SavatchadagiMahsulotlar.children("p").remove();
    //  ItemsLi bunga hamma li elementlarni ichiga joylimiz
    ItemsLi = $(`<li class='ListItems d-flex align-items-center flex-nowrap' data-product-name="${productToAdd.name}" data-product-price="${productToAdd.price}">
        <img class="w-25 my-1" src="${productToAdd.img}" />
        <h6 class="productName m-2 text-center ">${productToAdd.name}</h6>
        <p class="m-1 p-1 text-center font-weight-bold">${productToAdd.price}</p>
        <span class="clear">O'chirish</span></li>
  `);

    // SavatchadagiMahsulotlar => bu bizada ul va uni ichiga li elementini joylayabman
    SavatchadagiMahsulotlar.append(ItemsLi);
    // AllProductsNumber => bu o'zgaruvchi jami mahsulotlar sonini sanaydi
    var AllProductsNumber = $("#All-Products-Number");

    MahsulotlarSoni += SavatchadagiMahsulotlar.length;
    // MahsulotlarSoni => bu jami mahsulotlar yig'indisi o'z ichiga oladi
    AllProductsNumber.text(MahsulotlarSoni);
    // MahsulotlarSoni=> bu jami mahsulotlar sonini sanaydi saytdagi Savatcha yonidagi qizil dumaloqga yig'adi
    var DastlabkiMahsulotSoni = $("#Dastlabki-Mahsulot-Soni");
    DastlabkiMahsulotSoni.text(MahsulotlarSoni);
    // dastlabki pulni olamiz
    var HamyondagiDastlabkiPul = $("#Hamyondagi-Dastlabki-Pul");

    // UmumiyPul => Savat ichidagi "Ularning umumiy narxi" oldiga umumuy summani chiqarish uchun
    UmumiyPul += parseInt(productToAdd.price);

    // UmumiyPul => jami pullar yig'indisini shunga yi'gamiz
    HamyondagiDastlabkiPul.text(UmumiyPul);
  });
  $("#SavatchadagiMahsulot").click(".clear", function (event) {
    var ClearButton = $(event.target);
    var ClearProduct = ClearButton.closest("li").remove();
    var AllProductsNumber = $("#All-Products-Number");
    MahsulotlarSoni -= ClearProduct.length;
    AllProductsNumber.text(MahsulotlarSoni).length;
    var DastlabkiMahsulotSoni = $("#Dastlabki-Mahsulot-Soni");
    DastlabkiMahsulotSoni.text(MahsulotlarSoni).length;
    var HamyondagiDastlabkiPul = $("#Hamyondagi-Dastlabki-Pul");
    var AynanShuSumma = ClearButton.closest("li")
      .data("product-price")
      .slice(0, -4);
    UmumiyPul -= AynanShuSumma;
    HamyondagiDastlabkiPul.text(UmumiyPul);
    if (SavatchadagiMahsulot.children.length === 0) {
      var p = $(` <p class="m-0">Savatchada mahsulotlar yo'q</p>`);
      SavatchadagiMahsulotlar.append(p);
    }
  });
}); //document.ready
