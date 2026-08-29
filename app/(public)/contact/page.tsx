import styles from './contact.module.css';

export default function ContactPage() {
  return (
    <div className={styles.contactWrap}>
      <div className={styles.contactHeader}>
        <div className={styles.eyebrow}>Contact</div>
        <h1>Nous Contacter</h1>
        <p>Poser vos questions.</p>
      </div>

      <div className={styles.contactGrid}>
        <div className={`${styles.contactCard} ${styles.whatsappCard}`}>
          <div className={styles.iconWrap}>
            <svg xmlns="http://www.w3.org/-2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </div>
          <h2>WhatsApp</h2>
          <p>Envoyez-nous un message directement sur WhatsApp pour une réponse rapide. Nous sommes disponibles pour répondre à toutes vos questions.</p>
          <a href="https://wa.me/212762254347" target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
            Message WhatsApp
          </a>
        </div>

        <div className={`${styles.contactCard} ${styles.instagramCard}`}>
          <div className={styles.iconWrap}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </div>
          <h2>Instagram</h2>
          <p>Suivez-nous sur Instagram pour découvrir nos actualités, astuces et contenus exclusifs.</p>
          <a href="https://www.instagram.com/leprof_anas/" target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
            @leprof_anas
          </a>
        </div>

        <div className={`${styles.contactCard} ${styles.emailCard}`}>
          <div className={styles.iconWrap}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <h2>Email</h2>
          <p>Vous préférez l'email ? Écrivez-nous à notre adresse professionnelle et nous vous répondrons dans les plus brefs délais.</p>
          <a href="mailto:Profanaselmansouri@gmail.com" className={styles.linkBtn}>
            Profanaselmansouri@gmail.com
          </a>
        </div>
      </div>


    </div>
  );
}
