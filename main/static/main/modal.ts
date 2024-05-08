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
        console.log("Edit form or username not found");
        return;
    }
    editForm.onsubmit = function(event) {
        const location1 = document.getElementById('location1') as HTMLInputElement;
        console.log("Location 1 element:", location1.value);
        const location2 = document.getElementById('location2') as HTMLInputElement;
        const location3 = document.getElementById('location3') as HTMLInputElement;
        const locationData = {
            location1: location1.value,
            location2: location2.value,
            location3: location3.value
        };
        console.log("Location data:", locationData);
        event.preventDefault();
        updateFavoriteLocations(username, locationData);
        closeModalandReload();
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

function closeModalandReload(): void{
    const modal = document.getElementById('modal');
    if (!modal) {
        return;
    }
    modal.style.top = "-100%";
    setTimeout(() => {
        modal.style.display = "none";
        window.location.reload();
    }, 500);
} 