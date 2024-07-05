function checkConnection() {
    if (navigator.onLine) {
        window.location.href = 'index.html';
    } else {
        alert('You are still offline. Please check your internet connection.');
    }
}
