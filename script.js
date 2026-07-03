const header = document.querySelector("[data-header]");
const menu = document.querySelector("[data-menu]");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
});

menu?.addEventListener("click", () => {
  header.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => header.classList.remove("open"));
});

const flowData = {
  deposit: {
    number: "01",
    title: "Deposit creates a private note.",
    text: "The client creates private note data, publishes a commitment to the mixer contract, and stores the full note inside the local encrypted vault."
  },
  transfer: {
    number: "02",
    title: "Private transfer creates a new hidden note.",
    text: "The sender proves ownership of an input note, encrypts a recipient note, and can return change as another private note."
  },
  withdraw: {
    number: "03",
    title: "Withdraw without revealing the original deposit.",
    text: "The client proves valid ownership and nullifier correctness, then submits a withdrawal to a Stellar address."
  },
  recover: {
    number: "04",
    title: "Recover state from encrypted infrastructure.",
    text: "Encrypted event sync lets the desktop restore relevant notes while keeping plaintext note contents local."
  }
};

const flowNumber = document.getElementById("flow-number");
const flowTitle = document.getElementById("flow-title");
const flowText = document.getElementById("flow-text");

document.querySelectorAll(".flow-tab").forEach((button) => {
  button.addEventListener("click", () => {
    const data = flowData[button.dataset.flow];
    if (!data) return;

    document.querySelectorAll(".flow-tab").forEach((b) => b.classList.remove("active"));
    button.classList.add("active");

    flowNumber.textContent = data.number;
    flowTitle.textContent = data.title;
    flowText.textContent = data.text;
  });
});

const infraData = {
  treepir: {
    title: "TreePIR Server",
    text: "Merkle path lookup can leak which note a user is preparing to spend. TreePIR separates path retrieval from direct leaf disclosure, reducing server-visible correlation."
  },
  event: {
    title: "Event Server",
    text: "The event server indexes encrypted notes and nullifiers. It supports sync and recovery while keeping plaintext note contents on the client side."
  },
  wrapper: {
    title: "Groth16 Wrapper",
    text: "The wrapper converts local RISC Zero receipts into Groth16-compatible receipts for the on-chain verifier stack. It is not a wallet and does not hold user keys."
  },
  vault: {
    title: "Desktop Vault",
    text: "The desktop vault protects Mixer Identity and private note material locally, separating sensitive mixer secrets from ordinary frontend state."
  }
};

const infraTitle = document.getElementById("infra-title");
const infraText = document.getElementById("infra-text");

document.querySelectorAll(".infra-node").forEach((button) => {
  button.addEventListener("click", () => {
    const data = infraData[button.dataset.infra];
    if (!data) return;

    document.querySelectorAll(".infra-node").forEach((b) => b.classList.remove("active"));
    button.classList.add("active");

    infraTitle.textContent = data.title;
    infraText.textContent = data.text;
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
