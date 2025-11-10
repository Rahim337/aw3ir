var contactStore = (function () {

    let contactListString = localStorage.getItem('contactList')
    var contactList = contactListString ? JSON.parse(contactListString) : [];

    return {
        add: function (_name, _firsname, _date, _adress, _mail) {
            var contact = {
                name: _name,
                firstname: _firsname,
                date: _date,
                adress: _adress,
                mail: _mail,
            };
            // ajout du contact à la liste
            contactList.push(contact);

            localStorage.setItem('contactList', JSON.stringify(contactList));

            return contactList;
        },
        reset: function () {

            localStorage.removeItem('contactList');

            return contactList;
        },

        getList: function () {
            return contactList;
        },
    };
})();