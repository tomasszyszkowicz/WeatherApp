function showModal(): void{
    const username = document.getElementById('username')?.textContent;
    const favoriteLocation1 = document.getElementById('favoriteLocation1');
    const favoriteLocation2 = document.getElementById('favoriteLocation2');
    const favoriteLocation3 = document.getElementById('favoriteLocation3');
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('profileEditDetails');
    if (!modal || !modalContent || !favoriteLocation1 || !favoriteLocation2 || !favoriteLocation3) {
        return;
    }
    modalContent.innerHTML = `
        <div class="close" onclick="closeModal()">✖</div>
        <div class="password-container">
        <form id="editForm">
            <p>Location 1:</p>
            <input type="text" id="location1" value="${favoriteLocation1.textContent}">
            <p>Location 2:</p>
            <input type="text" id="location2" value="${favoriteLocation2.textContent}">
            <p>Location 3:</p>
            <input type="text" id="location3" value="${favoriteLocation3.textContent}">
            <button type="submit" style="margin-top: 10px;">Save Locations</button>
            <div class="modal-error-message" id="errorMessage"></div>
        </form>
        </div>
    `;
    modal.style.display = "block";
    setTimeout(() => {
        modal.style.top = "0"; // This will trigger the transition
    }, 10);

    const editForm = document.getElementById('editForm');
    if (!editForm || !username) {
        return;
    }
    var locationData = {
        location1: favoriteLocation1.textContent,
        location2: favoriteLocation2.textContent,
        location3: favoriteLocation3.textContent,
    };
    editForm.onsubmit = function(event) {
        event.preventDefault();
        updateFavoriteLocations(username, locationData);
        return false;
    }
}

function closeModal(): void{
    const modal = document.getElementById('modal');
    if (!modal) {
        return;
    }
    modal.style.top = "-100%";
    setTimeout(() => {
        modal.style.display = "none";
    }, 500);
}