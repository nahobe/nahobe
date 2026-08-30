// Lightbox con navegacion entre imagenes
document.addEventListener('DOMContentLoaded', () => {
	const lightbox = document.getElementById('lightbox');
	const lightboxImg = document.getElementById('lightbox-img');
	const lightboxCaption = document.getElementById('lightbox-caption');
	const closeBtn = document.getElementById('lightbox-close');
	const prevBtn = document.getElementById('lightbox-prev');
	const nextBtn = document.getElementById('lightbox-next');
	const photoItems = Array.from(document.querySelectorAll('.photo-item'));
	let current = 0;

	// Da la vuelta al llegar al principio o al final
	const show = (i) => {
		current = (i + photoItems.length) % photoItems.length;
		const item = photoItems[current];
		const caption = item.getAttribute('data-caption');
		lightboxImg.src = item.getAttribute('data-src');
		lightboxImg.alt = caption;
		lightboxCaption.textContent = caption;
	};

	const openLightbox = (i) => {
		show(i);
		lightbox.classList.add('active');
		document.body.style.overflow = 'hidden'; // Evita el scroll de fondo
	};

	const closeLightbox = () => {
		lightbox.classList.remove('active');
		document.body.style.overflow = '';
		setTimeout(() => {
			lightboxImg.src = '';
			lightboxCaption.textContent = '';
		}, 300);
	};

	photoItems.forEach((item, i) => {
		item.addEventListener('click', () => openLightbox(i));
	});

	closeBtn.addEventListener('click', closeLightbox);
	prevBtn.addEventListener('click', () => show(current - 1));
	nextBtn.addEventListener('click', () => show(current + 1));

	// Con una sola imagen las flechas no tienen sentido
	if (photoItems.length < 2) {
		prevBtn.hidden = true;
		nextBtn.hidden = true;
	}

	// Cerrar al hacer clic fuera de la imagen
	lightbox.addEventListener('click', (e) => {
		if (e.target === lightbox) {
			closeLightbox();
		}
	});

	// Escape cierra, flechas navegan
	document.addEventListener('keydown', (e) => {
		if (!lightbox.classList.contains('active')) return;
		if (e.key === 'Escape') closeLightbox();
		else if (e.key === 'ArrowLeft') show(current - 1);
		else if (e.key === 'ArrowRight') show(current + 1);
	});
});
			
