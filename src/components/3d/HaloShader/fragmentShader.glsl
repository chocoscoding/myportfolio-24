uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;
uniform vec3 iColor;
varying vec2 vUv;


void main() {
    vec2 fragCoord = vUv * iResolution;
	vec2 uv = 1.95*(2.0*fragCoord.xy - iResolution.xy) / iResolution.y;
    vec2 mouse = 1.5*(2.0*iMouse.xy - iResolution.xy) / iResolution.y;
	vec2 offset = vec2(cos(iTime/2.0)*mouse.x,sin(iTime/2.0)*mouse.y);

	float light = 0.1 / distance(normalize(uv), uv);
	vec3 light_color = iColor;
	
	if(length(uv) < 1.0){
		light *= 2.0 / distance(normalize(uv-offset), uv-offset);
	}
	

	gl_FragColor = vec4(light*light_color, 1.2);
}
