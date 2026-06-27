async function deleteMedicine() {
    const medicineName = document.getElementById("d_name").value;

    if (!medicineName) {
        alert("Please enter medicine name");
        return;
    }

    const res = await fetch('/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            medicineName
        })
    });

    const msg = await res.text();
    alert(msg);
}
