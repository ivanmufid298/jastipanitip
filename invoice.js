function GetPrint()
{
    /*For Print*/
    window.print();
}

function BtnAdd()
{
    /*Add Button*/
    var v = $("#TRow").clone().appendTo("#TBody") ;
    $(v).find("input").val('');
    $(v).removeClass("d-none");
    $(v).find("th").first().html($('#TBody tr').length - 1);
}

function BtnDel(v)
{
    /*Delete Button*/
       $(v).parent().parent().remove(); 
       GetTotal();

        $("#TBody").find("tr").each(
        function(index)
        {
           $(this).find("th").first().html(index);
        }

       );
}

function Calc(v) {
    /* Detail Calculation Each Row */
    var index = $(v).parent().parent().index();

    var qty = document.getElementsByName("qty")[index].value.replace(/[^\d]/g, ''); // Hanya ambil angka
    var rate = document.getElementsByName("rate")[index].value.replace(/[^\d]/g, ''); // Hanya ambil angka
    var fee = document.getElementsByName("fee")[index].value.replace(/[^\d]/g, ''); // Ambil angka dari elemen fee

    // Pastikan qty, rate, dan fee diubah ke angka
    qty = parseInt(qty) || 0;
    rate = parseInt(rate) || 0;
    fee = parseInt(fee) || 0;

    // Hitung jumlah
    var amt = (qty * rate) + fee;
    document.getElementsByName("amt")[index].value = 'Rp. ' + amt.toLocaleString(); // Tambahkan Rp dan format angka

    GetTotal();
}


function formatCurrency(input) {
    // Mengambil hanya angka dari input
    var value = input.value.replace(/[^\d]/g, '');

    // Jika tidak ada angka, kosongkan
    if (!value) {
        input.value = '';
        return;
    }

    // Menambahkan awalan "Rp." dan format ke ribuan
    input.value = 'Rp. ' + parseInt(value).toLocaleString();
}

function GetTotal() {
    /* Footer Calculation */
    var sum = 0;
    var amts = document.getElementsByName("amt");

    // Hitung total nilai dari semua "amt"
    for (let index = 0; index < amts.length; index++) {
        var amt = amts[index].value.replace(/[^\d]/g, ''); // Ambil nilai bersih dari amt
        sum += Number(amt);
    }

    // Update subtotal
    document.getElementById("FTotal").value = 'Rp. ' + sum.toLocaleString();

    // Ambil nilai GST, admin, dan fee, lalu hitung total bersih
    var gst = document.getElementById("FGST").value.replace(/[^\d]/g, '') || 0;
    var adm = document.getElementById("Fadmin").value.replace(/[^\d]/g, '') || 0;
    var fee = document.getElementById("fee").value.replace(/[^\d]/g, '') || 0;

    // Pastikan semua nilai dikonversi ke angka
    gst = Number(gst);
    adm = Number(adm);
    fee = Number(fee);

    // Hitung net dengan mengurangi GST dan menambahkan admin fee
    var net = sum - gst + adm;
    document.getElementById("FNet").value = 'Rp. ' + net.toLocaleString();

    // Hitung total akhir
    document.getElementById("FTot").value = 'Rp. ' + (net + fee).toLocaleString();
}


function showNewInputs() {
    const inputContainers = document.querySelectorAll(".new-input-container");
    inputContainers.forEach(container => {
        // Toggle visibility
        container.style.display = container.style.display === "none" ? "block" : "none";
    });
}
