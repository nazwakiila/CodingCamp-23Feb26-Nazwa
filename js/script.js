/**
 * ============================================
 * PORTFOLIO PERSONAL - JAVASCRIPT
 * ============================================
 */

// Menunggu DOM sepenuhnya dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi semua fungsi
    initMobileMenu();
    initWelcomeMessage();
    initFormValidation();
    initScrollAnimations();
    initSkillBars();
});

/**
 * ============================================
 * MOBILE MENU TOGGLE
 * ============================================ */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Tutup menu saat klik link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Tutup menu saat klik di luar
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
}

/**
 * ============================================
 * WELCOME MESSAGE DENGAN NAMA
 * ============================================ */
function initWelcomeMessage() {
    const welcomeText = document.getElementById('welcome-text');
    const heroTyped = document.getElementById('hero-typed');
    
    if (welcomeText) {
        // Cek apakah nama tersimpan di localStorage
        let userName = localStorage.getItem('userName');
        
        if (!userName || userName.trim() === '') {
            // Minta nama pengguna jika belum tersimpan
            setTimeout(() => {
                userName = prompt('Halo! Siapa nama Anda?');
                
                if (userName && userName.trim() !== '') {
                    // Simpan nama di localStorage
                    localStorage.setItem('userName', userName.trim());
                    updateWelcomeMessage(userName.trim());
                } else {
                    updateWelcomeMessage('Tamu');
                }
            }, 1000);
        } else {
            updateWelcomeMessage(userName);
        }
    }
    
    // Efet typing untuk subtitle
    if (heroTyped) {
        const texts = ['Web Developer', 'UI/UX Designer', 'Content Creator', 'Digital Enthusiast'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typeEffect() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                heroTyped.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                heroTyped.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 2000; // Jeda sebelum menghapus
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500; // Jeda sebelum mengetik teks baru
            }
            
            setTimeout(typeEffect, typingSpeed);
        }
        
        // Mulai efek typing setelah 2 detik
        setTimeout(typeEffect, 2000);
    }
}

/**
 * Update pesan selamat datang dengan nama
 */
function updateWelcomeMessage(name) {
    const welcomeText = document.getElementById('welcome-text');
    if (welcomeText) {
        welcomeText.textContent = `Halo ${name}, Selamat Datang di Portofolio Saya!`;
        welcomeText.style.animation = 'fadeIn 0.5s ease';
    }
}

/**
 * ============================================
 * FORM VALIDATION
 * ============================================ */
function initFormValidation() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        // Validasi saat submit
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Hapus error sebelumnya
            clearAllErrors();
            
            // Validasi form
            const isValid = validateForm();
            
            if (isValid) {
                // Ambil nilai form
                const formData = {
                    name: document.getElementById('name').value.trim(),
                    email: document.getElementById('email').value.trim(),
                    phone: document.getElementById('phone').value.trim(),
                    subject: document.getElementById('subject').value.trim(),
                    message: document.getElementById('message').value.trim()
                };
                
                // Tampilkan hasil
                displayFormResults(formData);
                
                // Simpan nama untuk pesan selamat datang
                localStorage.setItem('userName', formData.name);
            }
        });
        
        // Validasi real-time untuk setiap field
        const fields = ['name', 'email', 'phone', 'message'];
        fields.forEach(field => {
            const input = document.getElementById(field);
            if (input) {
                // Validasi saat blur (kehilangan fokus)
                input.addEventListener('blur', function() {
                    validateField(field);
                });
                
                // Hapus error saat mulai mengetik
                input.addEventListener('input', function() {
                    clearFieldError(field);
                });
            }
        });
    }
}

/**
 * Validasi seluruh form
 */
function validateForm() {
    let isValid = true;
    
    // Validasi setiap field
    isValid = validateField('name') && isValid;
    isValid = validateField('email') && isValid;
    isValid = validateField('phone') && isValid;
    isValid = validateField('message') && isValid;
    
    return isValid;
}

/**
 * Validasi field individual
 */
function validateField(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    if (!field || !errorElement) return true;
    
    const value = field.value.trim();
    let errorMessage = '';
    
    switch (fieldName) {
        case 'name':
            if (value === '') {
                errorMessage = 'Nama lengkap wajib diisi';
            } else if (value.length < 2) {
                errorMessage = 'Nama harus minimal 2 karakter';
            } else if (!/^[a-zA-Z\s'-]+$/.test(value)) {
                errorMessage = 'Nama hanya boleh berisi huruf, spasi, hyphen, dan apostrof';
            }
            break;
            
        case 'email':
            if (value === '') {
                errorMessage = 'Email wajib diisi';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                errorMessage = 'Masukkan alamat email yang valid';
            }
            break;
            
        case 'phone':
            if (value === '') {
                errorMessage = 'Nomor telepon wajib diisi';
            } else if (!/^[\d\s\-\+\$\$]{10,}$/.test(value)) {
                errorMessage = 'Masukkan nomor telepon yang valid (minimal 10 digit)';
            }
            break;
            
        case 'message':
            if (value === '') {
                errorMessage = 'Pesan wajib diisi';
            } else if (value.length < 10) {
                errorMessage = 'Pesan harus minimal 10 karakter';
            }
            break;
    }
    
    if (errorMessage) {
        showFieldError(fieldName, errorMessage);
        return false;
    }
    
    showFieldSuccess(fieldName);
    return true;
}

/**
 * Tampilkan error pada field
 */
function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    if (field && errorElement) {
        errorElement.textContent = message;
        field.parentElement.classList.add('error');
        field.parentElement.classList.remove('success');
        field.style.borderColor = '#E74C3C';
    }
}

/**
 * Tampilkan sukses pada field
 */
function showFieldSuccess(fieldName) {
    const field = document.getElementById(fieldName);
    
    if (field) {
        field.parentElement.classList.add('success');
        field.parentElement.classList.remove('error');
        field.style.borderColor = '#27AE60';
    }
}

/**
 * Hapus error dari field
 */
function clearFieldError(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    if (field && errorElement) {
        errorElement.textContent = '';
        field.parentElement.classList.remove('error');
        field.style.borderColor = '';
    }
}

/**
 * Hapus semua error
 */
function clearAllErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
    
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('error', 'success');
    });
    
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}

/**
 * ============================================
 * TAMPILKAN HASIL FORM
 * ============================================ */
function displayFormResults(data) {
    const form = document.getElementById('contactForm');
    const resultsDiv = document.getElementById('form-results');
    
    if (resultsDiv) {
        // Isi data hasil
        document.getElementById('result-name').textContent = data.name;
        document.getElementById('result-email').textContent = data.email;
        document.getElementById('result-phone').textContent = data.phone;
        document.getElementById('result-subject').textContent = data.subject || 'Tidak ada subjek';
        document.getElementById('result-message').textContent = data.message;
        
        // Tampilkan div hasil
        form.style.display = 'none';
        resultsDiv.style.display = 'block';
        
        // Scroll ke hasil
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Sembunyikan hasil setelah 15 detik
        setTimeout(() => {
            resultsDiv.style.display = 'none';
            form.style.display = 'block';
        }, 15000);
    }
}

/**
 * Reset form
 */
function resetForm() {
    const form = document.getElementById('contactForm');
    const resultsDiv = document.getElementById('form-results');
    
    if (form && resultsDiv) {
        form.reset();
        clearAllErrors();
        resultsDiv.style.display = 'none';
        form.style.display = 'block';
        
        // Scroll ke form
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

/**
 * ============================================
 * SCROLL ANIMATIONS
 * ============================================ */
function initScrollAnimations() {
    // Observer untuk animasi scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Amati elemen untuk animasi
    const animateElements = document.querySelectorAll(
        '.skill-card, .portfolio-card, .info-card, .timeline-item, .stat-item'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Tambahkan CSS untuk animasi
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * ============================================
 * SKILL BARS ANIMATION
 * ============================================ */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    if (skillBars.length > 0) {
        const observerOptions = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                    observer.unobserve(bar);
                }
            });
        }, observerOptions);
        
        skillBars.forEach(bar => observer.observe(bar));
    }
}

/**
 * ============================================
 * SMOOTH SCROLL UNTUK ANCHOR LINKS
 * ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/**
 * ============================================
   NAVBAR SCROLL EFFECT
 * ============================================ */
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(255, 105, 180, 0.2)';
        } else {
            navbar.style.boxShadow = '0 4px 15px rgba(255, 105, 180, 0.15)';
        }
    }
});

/**
 * ============================================
 * UTILITY FUNCTIONS
 * ============================================ */

/**
 * Debounce function untuk performance
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Format tanggal Indonesia
 */
function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date(date).toLocaleDateString('id-ID', options);
}

/**
 * Validasi email
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Validasi nomor telepon Indonesia
 */
function isValidPhone(phone) {
    const re = /^[\d\s\-\+\$\$]{10,}$/;
    return re.test(phone);
}

/**
 * ============================================
 * EXPORT FUNCTIONS (JIKA DIPERLUKAN)
 * ============================================ */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        validateField,
        displayFormResults,
        resetForm
    };
}