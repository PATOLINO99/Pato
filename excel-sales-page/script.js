// ========== CUSTOM MODAL UTILITIES ==========
// Beautiful, reliable replacements for confirm() and alert()

function customConfirm(message, title = 'Confirmação') {
    return new Promise((resolve) => {
        const overlay = document.getElementById('customModalOverlay');
        const modalIcon = document.getElementById('modalIcon');
        const modalTitle = document.getElementById('modalTitle');
        const modalMessage = document.getElementById('modalMessage');
        const modalActions = document.getElementById('modalActions');
        const confirmBtn = document.getElementById('modalConfirmBtn');
        const cancelBtn = document.getElementById('modalCancelBtn');

        // Set content
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modalIcon.className = 'modal-icon confirm';
        modalIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';

        // Show buttons
        modalActions.style.display = 'flex';
        confirmBtn.style.display = 'block';
        cancelBtn.style.display = 'block';

        // Show overlay
        overlay.classList.add('active');

        // Handle confirm
        const handleConfirm = () => {
            overlay.classList.remove('active');
            cleanup();
            resolve(true);
        };

        // Handle cancel
        const handleCancel = () => {
            overlay.classList.remove('active');
            cleanup();
            resolve(false);
        };

        // Cleanup listeners
        const cleanup = () => {
            confirmBtn.removeEventListener('click', handleConfirm);
            cancelBtn.removeEventListener('click', handleCancel);
            overlay.removeEventListener('click', handleOverlayClick);
        };

        // Close on overlay click
        const handleOverlayClick = (e) => {
            if (e.target === overlay) {
                handleCancel();
            }
        };

        confirmBtn.addEventListener('click', handleConfirm);
        cancelBtn.addEventListener('click', handleCancel);
        overlay.addEventListener('click', handleOverlayClick);
    });
}

function customAlert(message, title = 'Aviso', type = 'success') {
    return new Promise((resolve) => {
        const overlay = document.getElementById('customModalOverlay');
        const modalIcon = document.getElementById('modalIcon');
        const modalTitle = document.getElementById('modalTitle');
        const modalMessage = document.getElementById('modalMessage');
        const modalActions = document.getElementById('modalActions');
        const confirmBtn = document.getElementById('modalConfirmBtn');
        const cancelBtn = document.getElementById('modalCancelBtn');

        // Set content
        modalTitle.textContent = title;
        modalMessage.textContent = message;

        // Set icon based on type
        if (type === 'success') {
            modalIcon.className = 'modal-icon success';
            modalIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
        } else if (type === 'error') {
            modalIcon.className = 'modal-icon error';
            modalIcon.innerHTML = '<i class="fas fa-times-circle"></i>';
        }

        // Hide cancel button for alerts
        cancelBtn.style.display = 'none';
        confirmBtn.textContent = 'OK';
        confirmBtn.style.display = 'block';
        modalActions.style.display = 'flex';

        // Show overlay
        overlay.classList.add('active');

        // Handle OK
        const handleOk = () => {
            overlay.classList.remove('active');
            cleanup();
            resolve();
        };

        // Cleanup
        const cleanup = () => {
            confirmBtn.removeEventListener('click', handleOk);
            overlay.removeEventListener('click', handleOverlayClick);
            confirmBtn.textContent = 'Confirmar'; // Reset for next use
        };

        // Close on overlay click
        const handleOverlayClick = (e) => {
            if (e.target === overlay) {
                handleOk();
            }
        };

        confirmBtn.addEventListener('click', handleOk);
        overlay.addEventListener('click', handleOverlayClick);
    });
}

// Navigation Logic
function navigateTo(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('view-' + viewId).classList.add('active');
    window.scrollTo(0, 0);
}

document.addEventListener('DOMContentLoaded', () => {

    // 1. Dashboard Sidebar Navigation
    const navLinks = document.querySelectorAll('.dash-sidebar nav a:not(.logout)');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(n => n.classList.remove('active'));
            link.classList.add('active');
            // Here you would implement view switching within the dashboard if needed
        });
    });

    // 2. Mock Login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = loginForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Verificando...';

            setTimeout(() => {
                navigateTo('dashboard');
                // Init chart when dashboard is first shown
                initChart();
                btn.innerText = originalText;
            }, 800);
        });
    }

    // 3. Play Button Mock (Continue Watching)
    const continueBtn = document.querySelector('.btn-continue');
    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            alert('Continuando aula: Função PROCV e PROCH');
        });
    }

    // 4. Menu Toggle Logic
    const menuIcon = document.querySelector('.menu-icon');
    const dashSidebar = document.querySelector('.dash-sidebar');
    const mobileMenu = document.getElementById('mobile-menu');

    // Global toggle function
    window.toggleMenu = function () {
        if (mobileMenu) mobileMenu.classList.remove('active');
    };

    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            const isDashboard = document.getElementById('dash-settings').classList.contains('active');
            // Note: 'view-dashboard' wrapper logic might still be needed if landing/dashboard split exists
            // Assuming structural integrity, we toggle sidebar if in dash mode

            if (dashSidebar && getComputedStyle(dashSidebar).position === 'absolute') {
                if (dashSidebar.style.display === 'flex') {
                    dashSidebar.style.display = 'none';
                } else {
                    dashSidebar.style.display = 'flex';
                    dashSidebar.style.position = 'absolute';
                    dashSidebar.style.top = '70px';
                    dashSidebar.style.left = '0';
                    dashSidebar.style.width = '250px';
                    dashSidebar.style.zIndex = '999';
                    dashSidebar.style.background = 'white';
                    dashSidebar.style.boxShadow = '2px 0 10px rgba(0,0,0,0.1)';
                }
            } else {
                // Toggle Landing Menu
                if (mobileMenu) mobileMenu.classList.toggle('active');
            }
        });
    }

    // 5. Centralized Hub Logic (Internal Tabs)
    const hubTabs = document.querySelectorAll('.hub-tab');
    hubTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Deactivate all
            hubTabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.hub-pane').forEach(p => p.classList.remove('active'));

            // Activate clicked
            tab.classList.add('active');
            const targetId = tab.getAttribute('data-tab');
            const targetPane = document.getElementById(targetId);
            if (targetPane) targetPane.classList.add('active');
        });
    });

    // --- 6. Editor & Admin Settings System ---

    // State Management
    let isDirty = false;
    let isAdminAuthenticated = false;

    // Expanded Draft Config
    const draftConfig = {
        // Visuals
        primary: '#6a1b9a',
        accent: '#ff9800',
        bg: '#f3f4f6',

        // Identity
        platformName: 'ExcelPro',
        headerSub: 'PLATAFORMA OFICIAL DE ENSINO',

        // Hero
        heroTitle: 'DOMINE O EXCEL<br>DO <span class="highlight">ZERO AO PRO</span>',
        heroDesc: 'A única plataforma com certificação reconhecida e suporte 24h.',
        heroBtn: 'COMEÇAR AGORA',
        showHero: true,

        // Courses (Prices)
        c1Old: 'R$ 297', c1New: 'R$ 97,00',
        c4Old: 'R$ 997', c4New: 'R$ 297,00',

        // Kiwify Checkout Links (Professional Link Management)
        kiwifyLinks: {
            excel: 'https://pay.kiwify.com.br/KDTLmJB',
            powerbi: 'https://pay.kiwify.com.br/KDTLmJB',
            vba: 'https://pay.kiwify.com.br/KDTLmJB',
            combo: 'https://pay.kiwify.com.br/KDTLmJB'
        },

        // Content Visibility
        showProducts: true,

        // Sales Notification
        showToast: true,
        toastName: 'Ricardo S.',
        toastProduct: 'Acesso Total (Vitalício)',
        toastTime: 'Há 2 minutos',
        toastIconBg: '#e3f2fd',
        toastIconColor: '#1565c0',

        // Rotation
        rotationEnabled: false,
        rotationTime: 30,
        salesPool: []
    };

    // UI Elements (Shared)
    const btnSave = document.getElementById('btn-save-changes');
    const badgeUnsaved = document.getElementById('unsaved-badge');

    const btnAdminSave = document.getElementById('btn-admin-save');
    const badgeAdminUnsaved = document.getElementById('admin-unsaved-badge');

    const setDirty = (val) => {
        isDirty = val;
        const text = isDirty ? 'Salvar Alterações *' : 'Salvar Alterações';
        const display = isDirty ? '' : 'none'; // removing hidden class logic for direct style

        // Update both Safe Bars (Visual Editor & Admin Settings)
        if (btnSave) btnSave.innerText = text;
        if (badgeUnsaved) badgeUnsaved.style.display = isDirty ? 'flex' : 'none';

        if (btnAdminSave) {
            btnAdminSave.innerText = isDirty ? 'Salvar Configurações *' : 'Salvar Configurações';
            if (badgeAdminUnsaved) badgeAdminUnsaved.style.display = isDirty ? 'flex' : 'none';
        }
    };

    // --- ADMIN AUTHENTICATION ---
    const btnLogin = document.getElementById('btn-admin-login');
    const passInput = document.getElementById('admin-pass-input');
    const errorMsg = document.getElementById('admin-error-msg');
    const loginView = document.getElementById('settings-login-view');
    const contentView = document.getElementById('settings-content-view');

    if (btnLogin) {
        btnLogin.addEventListener('click', () => {
            if (passInput.value === 'Sant@1210') {
                isAdminAuthenticated = true;
                loginView.style.display = 'none';
                contentView.style.display = 'block';
                errorMsg.style.display = 'none';
            } else {
                errorMsg.style.display = 'block';
            }
        });
    }

    // --- PERSISTENCE: LOAD & SYNC ---
    // 1. Load from LocalStorage
    const savedData = localStorage.getItem('excelSalesConfig');
    if (savedData) {
        try {
            const parsed = JSON.parse(savedData);
            Object.assign(draftConfig, parsed);
        } catch (e) {
            console.error('Error loading config', e);
        }
    }

    // --- INPUT LISTENERS (Generic Binder with Sync) ---
    const bindInput = (id, configKey, isCheckbox = false) => {
        const el = document.getElementById(id);
        if (!el) return;

        // SYNC: Set input value from current Config (Defaults or Storage)
        if (isCheckbox) {
            el.checked = !!draftConfig[configKey];
        } else {
            el.value = draftConfig[configKey] || '';
        }

        el.addEventListener(isCheckbox ? 'change' : 'input', (e) => {
            draftConfig[configKey] = isCheckbox ? e.target.checked : e.target.value;
            setDirty(true);
        });
    };

    // Visual Editor Inputs
    const setCssVar = (name, value) => document.documentElement.style.setProperty(name, value);

    bindInput('picker-primary', 'primary');
    bindInput('picker-accent', 'accent');
    bindInput('picker-bg', 'bg');
    bindInput('input-hero-title', 'heroTitle');
    bindInput('input-hero-btn', 'heroBtn');
    bindInput('toggle-hero', 'showHero', true);
    bindInput('toggle-products', 'showProducts', true);
    bindInput('toggle-toast', 'showToast', true);

    // Notification Inputs
    bindInput('input-toast-name', 'toastName');
    bindInput('input-toast-product', 'toastProduct');
    bindInput('input-toast-time', 'toastTime');
    bindInput('picker-toast-icon-bg', 'toastIconBg');
    bindInput('picker-toast-icon-color', 'toastIconColor');

    // Rotation Inputs
    bindInput('toggle-rotation', 'rotationEnabled', true);
    bindInput('input-rotation-time', 'rotationTime');

    // --- ADMIN SETTINGS INPUTS (New) ---
    bindInput('conf-platform-name', 'platformName');
    bindInput('conf-header-sub', 'headerSub');
    // Hero duplicates
    bindInput('conf-hero-title', 'heroTitle');
    bindInput('conf-hero-desc', 'heroDesc');
    bindInput('conf-hero-btn', 'heroBtn');
    bindInput('conf-show-hero', 'showHero', true);

    // Courses
    bindInput('conf-c1-price-old', 'c1Old');
    bindInput('conf-c1-price-new', 'c1New');
    bindInput('conf-c4-price-old', 'c4Old');
    bindInput('conf-c4-price-new', 'c4New');

    // Kiwify Checkout Links
    const bindKiwifyLink = (inputId, productKey) => {
        const input = document.getElementById(inputId);
        if (input) {
            input.value = draftConfig.kiwifyLinks[productKey] || '';
            input.addEventListener('input', () => {
                draftConfig.kiwifyLinks[productKey] = input.value;
                setDirty(true);
            });
        }
    };

    bindKiwifyLink('conf-kiwify-excel', 'excel');
    bindKiwifyLink('conf-kiwify-powerbi', 'powerbi');
    bindKiwifyLink('conf-kiwify-vba', 'vba');
    bindKiwifyLink('conf-kiwify-combo', 'combo');

    bindInput('conf-show-toast', 'showToast', true);


    // --- SYNC PREVIEW LOGIC (Visual Only) ---
    // Keep the live preview for the Color/Notifications in the Visual Tab
    const syncPreview = () => {
        // Notification Preview
        const pName = document.getElementById('preview-name');
        const pProd = document.getElementById('preview-product');
        const pTime = document.getElementById('preview-time');
        const pIcon = document.getElementById('preview-icon');

        if (pName) pName.innerText = draftConfig.toastName;
        if (pProd) pProd.innerText = draftConfig.toastProduct;
        if (pTime) pTime.innerText = draftConfig.toastTime;
        if (pIcon) {
            pIcon.style.backgroundColor = draftConfig.toastIconBg;
            pIcon.style.color = draftConfig.toastIconColor;
        }

        // Note: We are using a draft system, so "Visual Editor" previews outside the 'Preview Box' 
        // are tricky without applying to site. 
        // For now, we stick to the Requirement: "Don't apply to site until Save".
    };

    // Loop to keep previews updated (simplistic) or just rely on listeners.
    // Listeners above only update config. We should add specific preview updates if needed.
    // For brevity, skipping extra preview logic for now as the core requirement is "Secure Save".

    // --- ROTATION POOL LOGIC ---
    // If we loaded from storage, draftConfig.salesPool has the 'truth'.
    // If not, we use the default hardcoded pool.
    if (!draftConfig.salesPool || draftConfig.salesPool.length === 0) {
        draftConfig.salesPool = [
            { id: 1, name: 'Ana P.', product: 'Power BI Master', time: 'Há 5 minutos', income: true },
            { id: 2, name: 'Carlos M.', product: 'Excel Profissional', time: 'Há 12 minutos', income: true },
            { id: 3, name: 'Marcos S.', product: 'Automação VBA', time: 'Há 30 minutos', income: true },
            { id: 4, name: 'Fernanda L.', product: 'Acesso Total (Vitalício)', time: 'Há 1 hora', income: true },
            { id: 5, name: 'João V.', product: 'Dashboards Incríveis', time: 'Há 10 segundos', income: true }
        ];
    }

    const adsListContainer = document.getElementById('active-ads-list');
    if (adsListContainer) {
        adsListContainer.innerHTML = '';
        // Use draftConfig.salesPool to render
        draftConfig.salesPool.forEach(ad => {
            const div = document.createElement('div');
            div.style.background = '#f9f9f9';
            div.style.padding = '8px';
            div.style.borderRadius = '6px';
            div.style.fontSize = '0.8rem';
            div.innerHTML = `
                <input type="checkbox" id="ad-check-${ad.id}" ${ad.income ? 'checked' : ''}>
                <label for="ad-check-${ad.id}"><strong>${ad.name}</strong> - ${ad.product}</label>
            `;
            adsListContainer.appendChild(div);

            div.querySelector('input').addEventListener('change', (e) => {
                ad.income = e.target.checked;
                setDirty(true);
            });
        });
    }

    // --- APPLY TO SITE (THE "SAVE" ACTION) ---

    let realRotationInterval = null;

    const applyToSite = () => {
        // ... (Visuals, Identity, Hero, Content Visibility, Course Prices, Notifications Style - SAME AS BEFORE) ...
        // 1. Visuals
        setCssVar('--primary', draftConfig.primary || '#6a1b9a');
        setCssVar('--gradient-purple', `linear-gradient(135deg, ${draftConfig.primary || '#6a1b9a'} 0%, #000 100%)`);
        setCssVar('--secondary', draftConfig.accent || '#ff9800');
        setCssVar('--accent', draftConfig.accent || '#ff9800');

        // Ensure BG applied to body or main container
        setCssVar('--bg-body', draftConfig.bg || '#f3f4f6');
        if (draftConfig.bg) document.body.style.backgroundColor = draftConfig.bg;

        const logoSpan = document.querySelector('.logo span');
        if (logoSpan) logoSpan.innerHTML = draftConfig.platformName.replace('Pro', '<strong>Pro</strong>');

        const officialHeader = document.querySelector('.official-box h3');
        if (officialHeader) officialHeader.innerText = draftConfig.headerSub;

        const heroH2 = document.querySelector('.banner-content h2');
        if (heroH2) heroH2.innerHTML = draftConfig.heroTitle;

        const heroP = document.querySelector('.banner-content p');
        if (heroP) heroP.innerHTML = draftConfig.heroDesc;

        const heroBtn = document.querySelector('.banner-hero .btn-orion');
        if (heroBtn) heroBtn.innerText = draftConfig.heroBtn;
        // 4. Content Visibility
        const elHero = document.querySelector('.banner-grid');
        if (elHero) {
            elHero.style.setProperty('display', draftConfig.showHero ? 'grid' : 'none', 'important');
        }

        const elProd = document.querySelector('.products-section');
        if (elProd) {
            elProd.style.setProperty('display', draftConfig.showProducts ? 'block' : 'none', 'important');
        }

        const elToast = document.getElementById('toast');
        if (elToast) {
            elToast.style.setProperty('display', draftConfig.showToast ? 'flex' : 'none', 'important');
        }

        const products = document.querySelectorAll('.product-card');
        if (products.length >= 1) {
            const oldP = products[0].querySelector('.price-box .old');
            const newP = products[0].querySelector('.price-box .new');
            if (oldP) oldP.innerText = draftConfig.c1Old;
            if (newP) newP.innerText = draftConfig.c1New;
        }
        if (products.length >= 4) {
            const oldP = products[3].querySelector('.price-box .old');
            const newP = products[3].querySelector('.price-box .new');
            if (oldP) oldP.innerText = draftConfig.c4Old;
            if (newP) newP.innerText = draftConfig.c4New;
        }

        if (elToast) {
            const realPName = elToast.querySelector('.toast-content p strong');
            const realProd = elToast.querySelector('.toast-content .blue');
            const realTime = elToast.querySelector('.toast-content .time');
            const realIcon = elToast.querySelector('.toast-icon');

            if (realPName) realPName.innerText = draftConfig.toastName;
            if (realProd) realProd.innerText = draftConfig.toastProduct;
            if (realTime) realTime.innerText = draftConfig.toastTime;

            if (realIcon) {
                realIcon.style.backgroundColor = draftConfig.toastIconBg;
                realIcon.style.color = draftConfig.toastIconColor;
            }
        }

        // 7. Rotation Logic (FIXED to use draftConfig.salesPool)
        if (realRotationInterval) clearInterval(realRotationInterval);

        if (draftConfig.rotationEnabled) {
            const time = Math.max(5000, (draftConfig.rotationTime || 30) * 1000);

            realRotationInterval = setInterval(() => {
                const activeAds = draftConfig.salesPool.filter(ad => ad.income); // Use draftConfig source of truth!
                if (activeAds.length === 0) return;
                const newAd = activeAds[Math.floor(Math.random() * activeAds.length)];

                const toast = document.getElementById('toast');
                if (toast) {
                    toast.classList.add('toast-transition');
                    toast.classList.add('fade-out');
                    setTimeout(() => {
                        const rn = toast.querySelector('.toast-content p strong');
                        const rp = toast.querySelector('.toast-content .blue');
                        const rt = toast.querySelector('.toast-content .time');
                        if (rn) rn.innerText = newAd.name;
                        if (rp) rp.innerText = newAd.product;
                        if (rt) rt.innerText = newAd.time;
                        toast.classList.remove('fade-out');
                    }, 500);
                }
            }, time);
            console.log('Site Rotation Started: ', time);
        } else {
            console.log('Site Rotation Stopped');
        }
    };

    // Let's do a post-definition init to ensure visuals match storage
    setTimeout(() => {
        applyToSite();
    }, 50);

    // Save Listeners (Persistence + Reload)
    const handleSave = async (e) => {
        console.log('handleSave called!', e);
        if (e) e.preventDefault();

        // Use custom modal instead of native confirm
        const confirmSave = await customConfirm(
            'Deseja salvar as configurações e atualizar o site?',
            'Salvar Alterações'
        );

        if (confirmSave) {
            console.log('User confirmed save. DraftConfig:', draftConfig);

            // 1. Persist
            try {
                localStorage.setItem('excelSalesConfig', JSON.stringify(draftConfig));
                console.log('Saved to localStorage successfully!');
            } catch (error) {
                console.error('Error saving to localStorage:', error);
                await customAlert('Erro ao salvar: ' + error.message, 'Erro', 'error');
                return;
            }

            // 2. Feedback & Reload
            await customAlert(
                'Configurações salvas com sucesso! A página será atualizada.',
                'Sucesso!',
                'success'
            );
            location.reload();
        } else {
            console.log('User cancelled save');
        }
    };

    console.log('btnSave:', btnSave, 'btnAdminSave:', btnAdminSave);

    if (btnSave) {
        console.log('Attaching event listener to btnSave');
        btnSave.addEventListener('click', handleSave);
    } else {
        console.warn('btn-save-changes not found!');
    }

    if (btnAdminSave) {
        console.log('Attaching event listener to btnAdminSave');
        btnAdminSave.addEventListener('click', handleSave);
    }

    // Create a global function as backup
    window.forceSave = () => {
        console.log('Force save called');
        handleSave(null);
    };

    // Exit Prevention
    window.addEventListener('beforeunload', (e) => {
        if (isDirty) {
            const msg = 'Você possui alterações não salvas.';
            e.returnValue = msg;
            return msg;
        }
    });

    // ========== KIWIFY CHECKOUT INTEGRATION ==========
    // Attach click handlers to all buy buttons
    const setupKiwifyRedirects = () => {
        const buyButtons = document.querySelectorAll('.btn-buy[data-product]');

        buyButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                const productKey = button.getAttribute('data-product');
                const checkoutUrl = draftConfig.kiwifyLinks[productKey];

                if (checkoutUrl && checkoutUrl.trim() !== '') {
                    // Direct redirect without page reload
                    console.log(`Redirecting to Kiwify checkout: ${checkoutUrl}`);
                    window.location.href = checkoutUrl;
                } else {
                    // Fallback: show alert if link not configured
                    customAlert(
                        `O link de checkout para "${productKey}" ainda não foi configurado. Configure em: Configurações > Vendas > Links de Checkout.`,
                        'Link Não Configurado',
                        'error'
                    );
                }
            });
        });
    };

    // Initialize Kiwify redirects
    setupKiwifyRedirects();

});

// Chart.js Init
let chartInstance = null;
function initChart() {
    if (chartInstance) return;
    const ctx = document.getElementById('studyChart');
    if (!ctx) return;

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Horas Estudadas',
                data: [1.5, 2, 0.5, 3, 2.5, 4, 1],
                backgroundColor: '#107C41',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true, grid: { color: '#e2e8f0' } },
                x: { grid: { display: false } }
            },
            plugins: { legend: { display: false } }
        }
    });
}
