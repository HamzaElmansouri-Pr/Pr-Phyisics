import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="eyebrow">Physique &middot; Chimie &middot; Lycée</div>
            <h1>
              Comprendre la physique,<br />pas juste l'<span>apprendre</span>.
            </h1>
            <p>
              Cours structurés, vidéos animées et exercices corrigés pour le tronc
              commun, 1ère et 2ème année Bac — avec un accès libre aux fiches PDF.
            </p>
            <div className="hero-actions">
              <Link href="/exercices" className="btn btn-primary">
                Accéder aux exercices
              </Link>
              <Link href="/exercices" className="btn btn-outline">
                Voir les cours
              </Link>
              <a href="https://instagram.com/profphysique.ma" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '11px 14px' }} title="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
            <div className="hero-meta">
              <div><b>12 ans</b><span>d'enseignement</span></div>
              <div><b>3 400+</b><span>élèves accompagnés</span></div>
              <div><b>180+</b><span>fiches d'exercices</span></div>
            </div>
          </div>
          <div className="cards-stage">
            <div className="grid-bg"></div>
            <div className="watermark">PROF. ANASS</div>

            <div className="cards-row-top">
              <div className="hero-card card-mech">
                <div className="ic">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 12h4l2-7 4 14 2-7h6" />
                  </svg>
                </div>
                <h3>MÉCANIQUE &amp; ONDES</h3>
                <p>Cinématique, dynamique et propagation des ondes.</p>
              </div>
            </div>

            <div className="cards-core-row">
              <div className="connector connector-top"></div>
              <div className="connector connector-bl"></div>
              <div className="connector connector-br"></div>
              <div className="node node-top"></div>
              <div className="node node-bl"></div>
              <div className="node node-br"></div>
              <div className="core-wrap">
                <div className="core-ring"></div>
                <div className="core"></div>
              </div>
            </div>

            <div className="cards-row-bottom">
              <div className="hero-card card-chem">
                <div className="ic">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M9 2v6.5L4.5 17a2 2 0 001.8 3h11.4a2 2 0 001.8-3L15 8.5V2M9 2h6" />
                  </svg>
                </div>
                <h3>CHIMIE DES SOLUTIONS</h3>
                <p>Réactions, dosages et transformations chimiques.</p>
              </div>
              <div className="hero-card card-exam">
                <div className="ic">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="12" r="4.5" />
                    <circle cx="12" cy="12" r="1" />
                  </svg>
                </div>
                <h3>PRÉPARATION AUX EXAMENS</h3>
                <p>Séries d'exercices et sujets corrigés alignés sur les examens.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="prof">
        <div className="wrap prof-grid">
          <div className="photo-frame" style={{ padding: 0, overflow: 'hidden' }}>
            <Image
              src="/prof.jpeg"
              alt="Pr. Anass El Mansouri"
              width={400}
              height={533}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="prof-copy">
            <div className="eyebrow">À propos du Prof Anas</div>
            <h2>Enseignant de physique-chimie depuis 12 ans</h2>
            <p>
              Passionné par les sciences et par la transmission du savoir, Le Prof Anas est titulaire d’une licence en chimie des procédés et analyses physico-chimiques. Il est également diplômé d’un centre de formation aux métiers de l’éducation et de l’enseignement.
            </p>
            <p>
              Son parcours a été enrichi par plusieurs stages pratiques dans le domaine des analyses chimiques, lui permettant d’allier connaissances scientifiques, expérience de laboratoire et compétences pédagogiques.
            </p>
            <p>
              Avec plus de 12 années d’expérience dans l’enseignement, Le Prof Anas a développé une méthode claire, progressive et adaptée aux besoins de chaque élève. Profondément passionné par la physique-chimie, il cherche à rendre les notions complexes plus simples, plus concrètes et plus accessibles.
            </p>
            <p>
              Convaincu que l’enseignement doit constamment évoluer, il refuse de se contenter des méthodes classiques. Il recherche toujours de nouvelles approches, crée des supports pédagogiques modernes et développe des méthodes innovantes afin d’aider ses élèves à mieux comprendre, à progresser et à réussir.
            </p>
            <div className="prof-creds">
              <div className="cred-row"><span className="ic">🎓</span>Licence en chimie des procédés et analyses physico-chimiques</div>
              <div className="cred-row"><span className="ic">🏫</span>12 ans d'enseignement au lycée</div>
            </div>
          </div>
        </div>
      </section>

      <section id="approche">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Approche</div>
            <h2>Une pédagogie pensée pour comprendre</h2>
            <p>
              Trois piliers qui structurent chaque cours, chaque vidéo et chaque exercice publié.
            </p>
          </div>
          <div className="features">
            <div className="feature">
              <div className="ic">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 3v6m0 0l3-3m-3 3L9 6M5 12h14M5 12a7 7 0 0014 0M5 12a7 7 0 0114-0" />
                </svg>
              </div>
              <h3>Pédagogie active</h3>
              <p>
                Des explications visuelles et progressives, pensées pour que l'élève comprenne le raisonnement, pas seulement la formule.
              </p>
            </div>
            <div className="feature">
              <div className="ic">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <path d="M8 9h8M8 13h5" />
                </svg>
              </div>
              <h3>Ressources ouvertes</h3>
              <p>
                Fiches, séries d'exercices et corrigés en PDF, classés par niveau et par chapitre, accessibles à tout moment.
              </p>
            </div>
            <div className="feature">
              <div className="ic">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 21c-4-3-7-6.5-7-10a7 7 0 0114 0c0 3.5-3 7-7 10z" />
                  <circle cx="12" cy="11" r="2.4" />
                </svg>
              </div>
              <h3>Préparation ciblée</h3>
              <p>
                Un suivi aligné sur les examens nationaux, avec des séries construites à partir des sujets les plus récents.
              </p>
            </div>
          </div>
        </div>
      </section>

      <svg className="wave-divider" viewBox="0 0 1180 60" preserveAspectRatio="none">
        <path d="M0,30 C 150,0 250,60 400,30 S 650,0 800,30 S 1050,60 1180,30" fill="none" stroke="#182238" strokeWidth="1.5" />
      </svg>

      <section>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Témoignages</div>
            <h2>Ce que disent les élèves</h2>
          </div>
          <div className="testi">
            <div className="testi-card">
              <div className="stars">★★★★★</div>
              <p>"Les fiches PDF sont hyper claires, je les utilise avant chaque contrôle. Ça m'a vraiment aidée à progresser en chimie."</p>
              <div className="testi-who">
                <div className="av"></div>
                <div><b>Salma B.</b><span>2ème année Bac</span></div>
              </div>
            </div>
            <div className="testi-card">
              <div className="stars">★★★★★</div>
              <p>"Le prof explique les ondes mécaniques d'une façon que je n'avais jamais comprise avant. Les livres et cours sont un vrai plus."</p>
              <div className="testi-who">
                <div className="av"></div>
                <div><b>Youssef K.</b><span>1ère année Bac</span></div>
              </div>
            </div>
            <div className="testi-card">
              <div className="stars">★★★★★</div>
              <p>"Facile de trouver l'exercice qu'il me faut, tout est bien classé par niveau et par chapitre. Gain de temps énorme."</p>
              <div className="testi-who">
                <div className="av"></div>
                <div><b>Imane R.</b><span>Tronc commun</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="cta-band">
            <h2>Prêt à progresser en physique-chimie ?</h2>
            <p>Toutes les fiches, vidéos et séries d'exercices sont accessibles librement, sans inscription.</p>
            <div className="cta-actions">
              <Link href="/exercices" className="btn btn-primary">Explorer la bibliothèque</Link>
              <Link href="/contact" className="btn btn-outline">Me contacter</Link>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
