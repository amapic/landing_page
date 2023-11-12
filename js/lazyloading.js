const lazyImages = document.querySelectorAll(".lazy");

const options = {
  root: null, // Use the viewport as the root
  rootMargin: "0px",
  threshold: 0.1 // Specify the threshold for intersection
};

// document.addEventListener("DOMContentLoaded", function(event) { 
//   var gg=[]
//   gg=document.querySelectorAll(".lazy")
//   // console.log(gg[0].src)
//   gg.forEach((entry) => {
//     // console.log("rr",entry);
//     // if (entry.isIntersecting) {
//       // const img = entry.target;
//       // const src = entry.src;
//       // Replace the placeholder with the actual image source
//       entry.setAttribute("data-src") = src;
//       entry.src="https://placehold.co/300x300?text=Coming+Soon";
//       // Stop observing the image
//       // observer.unobserve(img);
//     // }
//   });
// });


const handleIntersection = (entries, observer) => {
  entries.forEach((entry) => {
    // console.log(entry);
    if (entry.isIntersecting) {
      const img = entry.target;
      const src = img.getAttribute("data-kaka");

      // Replace the placeholder with the actual image source
      img.src = src;

      // Stop observing the image
      observer.unobserve(img);
    }
  });
};

const observer = new IntersectionObserver(handleIntersection, options);

lazyImages.forEach((image) => {
  observer.observe(image);
});