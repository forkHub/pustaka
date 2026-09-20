"use strict";
// Rotation helpers
function rotateX([x, y, z], angle) {
    const cos = Math.cos(angle), sin = Math.sin(angle);
    return [x, y * cos - z * sin, y * sin + z * cos];
}
function rotateY([x, y, z], angle) {
    const cos = Math.cos(angle), sin = Math.sin(angle);
    return [x * cos + z * sin, y, -x * sin + z * cos];
}
function rotateZ([x, y, z], angle) {
    const cos = Math.cos(angle), sin = Math.sin(angle);
    return [x * cos - y * sin, x * sin + y * cos, z];
}
// Projection with camera rotation + position
function projectVertices(vertices, focalLength = 500, cameraDistance = 1000, cameraRotation = [0, 0, 0], cameraPosition = [0, 0, 0]) {
    const transformed = [];
    const projected = [];
    vertices.forEach(([x, y, z]) => {
        // Translate relative to camera
        let tx = x - cameraPosition[0];
        let ty = y - cameraPosition[1];
        let tz = z - cameraPosition[2];
        // Apply rotations
        [tx, ty, tz] = rotateX([tx, ty, tz], cameraRotation[0]);
        [tx, ty, tz] = rotateY([tx, ty, tz], cameraRotation[1]);
        [tx, ty, tz] = rotateZ([tx, ty, tz], cameraRotation[2]);
        transformed.push([tx, ty, tz]);
        // Perspective projection
        const scale = focalLength / (cameraDistance + tz);
        projected.push([tx * scale, ty * scale]);
    });
    return { projected, transformed };
}
// Compute normal of a face
function computeNormal(vertices, face) {
    const [i0, i1, i2] = face;
    const [x0, y0, z0] = vertices[i0];
    const [x1, y1, z1] = vertices[i1];
    const [x2, y2, z2] = vertices[i2];
    const ux = x1 - x0, uy = y1 - y0, uz = z1 - z0;
    const vx = x2 - x0, vy = y2 - y0, vz = z2 - z0;
    return [uy * vz - uz * vy, uz * vx - ux * vz, ux * vy - uy * vx];
}
// Dot product
function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
// Edge length in 3D
function edgeLength(a, b) {
    const dx = a[0] - b[0], dy = a[1] - b[1], dz = a[2] - b[2];
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
// Render faces with culling + edge lengths
function renderFaces(ctx, projected, transformed, faces, cameraDir = [0, 0, -1]) {
    ctx.strokeStyle = "black";
    ctx.fillStyle = "red";
    ctx.font = "12px Arial";
    ctx.beginPath();
    faces.forEach(face => {
        const normal = computeNormal(transformed, face);
        // Cull back-facing faces
        // if (dot(normal, cameraDir) <= 0) return;
        // Draw edges + annotate lengths
        for (let i = 0; i < face.length; i++) {
            const i0 = face[i];
            const i1 = face[(i + 1) % face.length];
            const [x0, y0] = projected[i0];
            const [x1, y1] = projected[i1];
            ctx.moveTo(x0, y0);
            ctx.lineTo(x1, y1);
            const length = edgeLength(transformed[i0], transformed[i1]);
            const midX = (x0 + x1) / 2;
            const midY = (y0 + y1) / 2;
            ctx.fillText(length.toFixed(1), midX, midY);
        }
    });
    ctx.stroke();
}
