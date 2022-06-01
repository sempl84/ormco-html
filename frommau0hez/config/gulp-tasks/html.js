import versionNumber from "gulp-version-number";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import fileinclude from 'gulp-file-include';

export const html = () => {
	return app.gulp.src(`${app.path.build.html}*.html`)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "HTML",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(
			app.plugins.if(
				app.isWebP,
				webpHtmlNosvg()
			)
		)
		.pipe(versionNumber({
			'value': '%DT%',
			'append': {
				'key': '_v',
				'cover': 0,
				'to': ['css', 'js', 'img']
			},
			'output': {
				'file': 'config/version.json'
			}
		}))
		.pipe(fileinclude({
			prefix: '@@@',
			basepath: '@file'
		}))
		.pipe(app.gulp.dest(app.path.build.html));
}
