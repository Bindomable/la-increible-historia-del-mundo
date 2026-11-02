(() => {
  'use strict';
  const data = window.PrehistoriaScenes;
  const root = document.createElement('section');
  root.id = 'explorador-prehistoria';
  root.className = 'wrap ph-explorer';
  root.setAttribute('aria-labelledby', 'ph-title');
  document.querySelector('main').after(root);
  const el = (tag, text, cls) => {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (cls) node.className = cls;
    return node;
  };
  root.append(el('p', 'OBSERVA · DESCUBRE · EXPLICA', 'tag'), el('h2', 'Explora la vida en la Prehistoria'));
  root.lastChild.id = 'ph-title';
  root.append(el('p', 'Elige una etapa y abre sus fichas. Compara lo que estudias en el colegio con las precisiones que aporta la investigación.'));
  const menu = el('div', null, 'ph-menu');
  menu.setAttribute('role', 'group');
  menu.setAttribute('aria-label', 'Etapas para explorar');
  const panel = el('div');
  panel.id = 'ph-panel';
  root.append(menu, panel);
  const buttons = [];
  const attempts = new Map();
  for (const scene of data.scenes) {
    const button = el('button', `${scene.icon} ${scene.title}`);
    button.type = 'button';
    button.setAttribute('aria-controls', 'ph-panel');
    button.addEventListener('click', () => render(scene));
    menu.append(button);
    buttons.push(button);
  }
  function render(scene) {
    buttons.forEach((b, i) => b.setAttribute('aria-pressed', String(data.scenes[i].id === scene.id)));
    panel.replaceChildren();
    const card = el('article', null, 'card');
    const title = el('h3', `${scene.title} · ${scene.subtitle}`);
    title.tabIndex = -1;
    card.append(title, el('p', scene.date, 'ph-date'));
    if (scene.illustrationNote) card.append(el('p', scene.illustrationNote, 'ph-art-note'));
    if (scene.imageStatus === 'revisada' && scene.altStatus === 'validado' && scene.alt && scene.image && scene.variants.length) {
      card.append(el('p', 'Toca los números de la imagen para explorar sus pistas y responder a las preguntas. También puedes abrir las fichas que aparecen debajo.', 'ph-instruction'));
      const figure = el('figure', null, 'ph-image');
      const picture = el('picture');
      for (const format of ['avif', 'webp']) {
        const variants = scene.variants.filter(v => v.format === format);
        if (!variants.length) continue;
        const source = el('source');
        source.type = `image/${format}`;
        source.srcset = variants.map(v => `${v.src} ${v.width}w`).join(', ');
        source.sizes = '(max-width: 1050px) 94vw, 1000px';
        picture.append(source);
      }
      const image = el('img');
      image.src = scene.image;
      image.alt = scene.alt;
      image.loading = 'lazy';
      image.decoding = 'async';
      const fallback = scene.variants.filter(v => v.format === 'jpg');
      image.srcset = fallback.map(v => `${v.src} ${v.width}w`).join(', ');
      image.sizes = '(max-width: 1050px) 94vw, 1000px';
      const master = fallback[fallback.length - 1];
      if (master) { image.width = master.width; image.height = master.height; }
      picture.append(image);
      figure.append(picture);
      let fallbackAttempted = false;
      image.addEventListener('error', () => {
        if (!fallbackAttempted && scene.imageFallback) {
          fallbackAttempted = true;
          picture.querySelectorAll('source').forEach(source => source.remove());
          image.removeAttribute('srcset');
          image.removeAttribute('sizes');
          image.src = scene.imageFallback;
          return;
        }
        figure.replaceChildren(el('p', 'La ilustración no se ha podido cargar. Puedes seguir explorando las fichas.', 'ph-missing'));
      });
      for (const [i, zone] of scene.zones.entries()) {
        if (!zone.anchor || zone.placementStatus !== 'validada') continue;
        const hotspot = el('button', String(i + 1), 'ph-hotspot');
        hotspot.type = 'button';
        hotspot.style.left = `${zone.anchor.x * 100}%`;
        hotspot.style.top = `${zone.anchor.y * 100}%`;
        hotspot.setAttribute('aria-label', `Explorar ${zone.title}`);
        hotspot.setAttribute('aria-controls', `ph-${scene.id}-${zone.id}`);
        hotspot.setAttribute('aria-expanded', 'false');
        hotspot.dataset.zone = zone.id;
        hotspot.addEventListener('click', () => {
          const target = document.getElementById(`ph-${scene.id}-${zone.id}`);
          target.open = true;
          target.querySelector('summary').focus();
          target.scrollIntoView({block: 'nearest'});
        });
        figure.append(hotspot);
      }
      card.append(figure);
    } else {
      const missing = el('div', null, 'ph-missing');
      missing.append(el('span', scene.icon, 'ph-symbol'), el('strong', 'Ilustración pendiente de incorporar'), el('p', 'Las fichas ya están disponibles. La escena se añadirá después de incorporar y revisar su ilustración.'));
      card.append(missing);
    }
    const curriculum = el('details', null, 'ph-context');
    curriculum.append(el('summary', 'Temario del colegio y precisión histórica'));
    curriculum.append(el('h4', 'En el colegio'), el('p', scene.school), el('h4', 'Precisión histórica verificada'), el('p', scene.precision));
    const refs = el('p', null, 'muted');
    refs.append(document.createTextNode('Fuentes: '));
    scene.sourceIds.forEach((id, i) => {
      if (i) refs.append(document.createTextNode(' · '));
      const source = data.sources[id], link = el('a', source.title);
      link.href = source.url;
      refs.append(link);
    });
    curriculum.append(refs);
    card.append(curriculum, el('h4', 'Fichas para explorar'));
    const zones = el('div', null, 'ph-zones');
    scene.zones.forEach((zone, i) => {
      const detail = el('details', null, 'ph-zone');
      detail.id = `ph-${scene.id}-${zone.id}`;
      detail.append(el('summary', `${i + 1}. ${zone.title}`), el('p', zone.text));
      const question = el('p');
      question.append(el('strong', zone.question));
      const answer = el('details', null, 'ph-answer');
      answer.append(el('summary', 'Comprobar mi explicación'), el('p', zone.answer));
      detail.append(question, answer);
      zones.append(detail);
    });
    card.append(zones);
    if (scene.zones.some(z => z.choiceOptions)) {
      let answers = attempts.get(scene.id);
      if (!answers) { answers = new Map(); attempts.set(scene.id, answers); }
      const status = el('p', null, 'ph-score');
      status.setAttribute('aria-live', 'polite');
      const updateScore = () => {
        const correct = scene.zones.filter(z => answers.get(z.id) === z.correctChoice).length;
        status.textContent = `Tu práctica: ${answers.size} de ${scene.zones.length} respondidas · ${correct} ${correct === 1 ? 'acierto' : 'aciertos'}`;
      };
      updateScore();
      zones.before(status);
      for (const zone of scene.zones) {
        if (!zone.choiceOptions) continue;
        const detail = zones.querySelector(`#ph-${scene.id}-${zone.id}`);
        const explanation = detail.querySelector('.ph-answer');
        explanation.remove();
        const options = el('div', null, 'ph-options');
        options.setAttribute('role', 'group');
        options.setAttribute('aria-label', zone.question);
        const feedback = el('p', null, 'ph-feedback');
        feedback.setAttribute('aria-live', 'polite');
        const reveal = () => {
          const chosen = answers.get(zone.id);
          if (chosen === undefined) return;
          const correct = chosen === zone.correctChoice;
          feedback.textContent = `${correct ? '¡Correcto!' : 'Vamos a revisarlo.'} ${zone.answer}`;
          feedback.classList.toggle('ph-correct', correct);
          [...options.children].forEach((b, i) => {
            b.disabled = true;
            b.setAttribute('aria-pressed', String(i === chosen));
          });
        };
        zone.choiceOptions.forEach((text, i) => {
          const option = el('button', text);
          option.type = 'button';
          option.setAttribute('aria-pressed', 'false');
          option.addEventListener('click', () => {
            if (answers.has(zone.id)) return;
            answers.set(zone.id, i);
            reveal();
            updateScore();
          });
          options.append(option);
        });
        detail.append(options, feedback);
        reveal();
        const hotspot = card.querySelector(`[data-zone="${zone.id}"]`);
        if (hotspot) detail.addEventListener('toggle', () => hotspot.setAttribute('aria-expanded', String(detail.open)));
      }
      const reset = el('button', 'Volver a practicar estas preguntas');
      reset.type = 'button';
      reset.addEventListener('click', () => {
        attempts.delete(scene.id);
        render(scene);
        panel.querySelector('h3').focus();
      });
      card.append(reset, el('p', 'Esta práctica se conserva mientras mantienes abierta la página. El progreso de los capítulos sigue funcionando por separado.', 'muted'));
    }
    panel.append(card);
  }
  render(data.scenes.find(s => s.id === 'paleolitico') || data.scenes[0]);
})();
