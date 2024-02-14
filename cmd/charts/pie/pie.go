package pie

import (
	"bytes"
	"fmt"
	"github.com/go-echarts/go-echarts/v2/charts"
	"github.com/go-echarts/go-echarts/v2/opts"
	"golang.org/x/net/html"
	"html/template"
	"log"
	"math/rand"
)

type ToHtmlFunc func(value interface{}) template.HTML

var (
	itemCntPie = 4
	seasons    = []string{"Food", "Rent", "Utilities ", "Public transport"}
)

func generatePieItems() []opts.PieData {
	items := make([]opts.PieData, 0)
	for i := 0; i < itemCntPie; i++ {
		items = append(items, opts.PieData{Name: seasons[i], Value: rand.Intn(400)})
	}
	return items
}
func pieBase() *charts.Pie {
	pie := charts.NewPie()

	pie.AddSeries("pie", generatePieItems()).SetSeriesOptions(
		charts.WithLabelOpts(
			opts.Label{
				Show:      true,
				Formatter: "{b}: {c} BGN",
			}),
		charts.WithSeriesAnimation(true),
	)
	return pie
}

func GetHtmlFunc() ToHtmlFunc {
	return func(value interface{}) template.HTML {
		return template.HTML(fmt.Sprint(value))
	}
}

func GetBudgetChart() string {
	pie := pieBase()

	var buf bytes.Buffer
	err := pie.Render(&buf)
	if err != nil {
		log.Fatalf("Failed to render chart: %v", err)
	}

	doc, err := html.Parse(bytes.NewReader(buf.Bytes()))
	if err != nil {
		log.Fatalf("Failed to parse HTML: %v", err)
	}

	body := findBodyElement(doc)
	if body == nil {
		log.Fatal("Body element not found")
	}

	innerBodyHTML := innerHTML(body)
	return innerBodyHTML
}

func findBodyElement(n *html.Node) *html.Node {
	if n.Type == html.ElementNode && n.Data == "body" {
		return n
	}
	for c := n.FirstChild; c != nil; c = c.NextSibling {
		result := findBodyElement(c)
		if result != nil {
			return result
		}
	}
	return nil
}

func innerHTML(n *html.Node) string {
	var buf bytes.Buffer
	for c := n.FirstChild; c != nil; c = c.NextSibling {
		err := html.Render(&buf, c)
		if err != nil {
			log.Fatalf("Failed to render node: %v", err)
		}
	}
	return buf.String()
}
