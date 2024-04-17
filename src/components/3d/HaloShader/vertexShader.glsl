void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = 1.5 * (2.0 * fragCoord.xy - iResolution.xy) / iResolution.y;
    vec2 mouse = 1.5 * (2.0 * iMouse.xy - iResolution.xy) / iResolution.y;
    vec2 offset = vec2(cos(iTime / 2.0) * mouse.x, sin(iTime / 2.0) * mouse.y);

    vec3 light_color = vec3(0.9, 0.65, 0.5);
    float light = 0.1 / distance(normalize(uv), uv);
    
    if (length(uv) < 1.0) {
        light *= 0.1 / distance(normalize(uv - offset), uv - offset);
    }

    fragColor = vec4(light * light_color, 1.0);
}
