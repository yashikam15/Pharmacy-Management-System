async function updateMedicine() {
    const medicineName = document.getElementById("u_name").value;
    const price = document.getElementById("u_price").value;
    const quantity = document.getElementById("u_quantity").value;
    const expirationDate = document.getElementById("u_expiry").value;

    const res = await fetch('/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            medicineName,
            price,
            quantity,
            expirationDate
        })
    });

    const msg = await res.text();
    alert(msg);
}
