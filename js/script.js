document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("messageForm");
    
    // Update Waktu Otomatis
    const timeDisplay = document.getElementById("currentTime");
    setInterval(() => {
        const now = new Date();
        timeDisplay.innerText = "Current time : " + now.toString();
    }, 1000);

    // Handle Form Submit
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // 

        // Ambil Nilai
        const nama = document.getElementById("inputNama").value;
        const tgl = document.getElementById("inputTgl").value;
        const jk = document.querySelector('input[name="jk"]:checked').value;
        const pesan = document.getElementById("inputPesan").value;

        // Tampilkan di Result Box
        document.getElementById("resNama").innerText = nama;
        document.getElementById("resTgl").innerText = tgl;
        document.getElementById("resJK").innerText = jk;
        document.getElementById("resPesan").innerText = pesan;
        
        alert("Pesan Terkirim!");
    });
});