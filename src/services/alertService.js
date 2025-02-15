import Swal from "sweetalert2";

class AlertService {
    static success(message = "Операция выполнена успешно!") {
        Swal.fire({
            icon: "success",
            title: "Успех!",
            text: message,
            confirmButtonText: "ОК",
        });
    }

    static error(message = "Что-то пошло не так!") {
        Swal.fire({
            icon: "error",
            title: "Ошибка!",
            text: message,
            confirmButtonText: "ОК",
        });
    }

    static warning(message = "Будьте внимательны!") {
        Swal.fire({
            icon: "warning",
            title: "Внимание!",
            text: message,
            confirmButtonText: "ОК",
        });
    }

    static info(message = "Обратите внимание!") {
        Swal.fire({
            icon: "info",
            title: "Информация",
            text: message,
            confirmButtonText: "ОК",
        });
    }

    static confirmDelete(message = "Вы уверены, что хотите удалить?") {
        return Swal.fire({
            icon: "warning",
            title: "Подтвердите удаление",
            text: message,
            showCancelButton: true,
            confirmButtonText: "Да, удалить",
            cancelButtonText: "Отмена",
            reverseButtons: true, // Меняет местами кнопки
        }).then((result) => {
            if (result.isConfirmed) {
                return true; // Пользователь подтвердил удаление
            } else {
                return false; // Пользователь отменил удаление
            }
        });
    }

    static confirmRestore(message = "Вы уверены, что хотите восстановить?") {
        return Swal.fire({
            icon: "question",
            title: "Подтвердите восстановление",
            text: message,
            showCancelButton: true,
            confirmButtonText: "Да, восстановить",
            cancelButtonText: "Отмена",
            reverseButtons: true,
        }).then((result) => result.isConfirmed);
    }
}

export default AlertService;