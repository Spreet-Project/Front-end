import Swal from 'sweetalert2';

function sweetAlert(timer: number, icon, title: string): void {
  Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer,
    timerProgressBar: true,
    didOpen: toast => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  }).fire({
    icon,
    title,
  });
}

export default sweetAlert;
